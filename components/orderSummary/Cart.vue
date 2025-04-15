<template>
  <div>
    <FormSectionHeader :label="''" />

    <div v-if="!onTop" @click="() => toggleOrderDetails = !toggleOrderDetails"
      class="lg:hidden w-full flex justify-between items-center py-4">
      <p class="flex text-brown items-center gap-1 text-base font-medium">Order Summary
      </p>
      <NuxtImg :src="toggleOrderDetails ? '/images/arrow-up.svg' : '/images/arrow-down.svg'" alt="arrow" width="20"
        height="20" />
    </div>

    <table class="w-full mt-2">
      <thead>
      </thead>
      <tbody v-if="toggleOrderDetails" class="lg:hidden">
        <CartItemSkeleton v-if="cartLoading" />
        <CartItem v-else v-for="item in productCart" :key="item.product_id" :item="item" />
      </tbody>
      <tbody class="hidden lg:block">
        <CartItemSkeleton v-if="cartLoading" />
        <CartItem v-else v-for="item in productCart" :key="item.product_id" :item="item" />
      </tbody>

    </table>

    <!-- Coupon -->
    <div class="flex gap-3 lg:gap-0 lg:flex-wrap w-full">
      <div class="w-10/12 lg:pr-0 pr-0">
        <CustomInput v-model="formStore.formValues.discountCode" type="text" placeholder="Discount Code"
          class="w-[96%]" />
      </div>
      <div class="lg:w-2/12 sm:w-1/4 lg:ml-0">
        <CustomButton placeholder="Apply" @click="calculateDiscount"
          class="border border-gray-300 rounded-md text-sm sm:mt-6 apply-btn" :color="false" />
      </div>
    </div>
    <!-- Coupon Success Messages -->
    <div v-if="couponSuccess.length">
      <div v-for="(coupon, index) in couponSuccess" :key="'success-' + index"
        class="flex items-center gap-1 mt-1 xl:text-xs text-xs lg:mb-3 ml-1">
        <span class="text-green-700 font-semibold text-[14px]">{{ coupon.code }},</span>
        <span class="text-[14px]">{{ coupon.msg }}</span>
        <!-- Cross Svg -->
        <span v-if="coupon.code !== 'VIP10'" class="cursor-pointer" @click="removeCoupon(coupon.code)">
          <svg class="inline" height="20" fill="red" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
            viewBox="0 0 92 92" id="cross">
            <path
              d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z">
            </path>
          </svg>
        </span>
      </div>
    </div>

    <!-- Coupon Error Message -->
    <div v-if="cartStore.couponError.msg">
      <div class="mt-2 xl:text-sm text-xs">
        <span class="text-red-500 font-semibold">{{ cartStore.couponError.code }}, </span>
        <span>{{ cartStore.couponError.msg }}</span>
      </div> <!-- Only show the first error message -->
    </div>
    <table class="w-full mt-2">
      <thead>
        <!-- <tr class="border border-gray-300 h-10">
          <td class="w-1/3"></td>
          <td class="font-poppins font-bold w-2/3">Item</td>
          <td class="font-poppins font-bold">Price</td>
        </tr> -->
      </thead>
      <tbody>

      </tbody>
      <CartSummary :loading="cartLoading" :summaryItems="summaryItems" />

    </table>

  </div>
</template>

<script setup lang="ts">
import { useCartStore, useFormStore, useCheckoutStore,useSiteStore } from "~/stores";
import CartItem from "./CartItem.vue";
import CartSummary from "./CartSummary.vue";
import { computed } from "vue";
import CartItemSkeleton from "./CartItemSkeleton.vue";
import { boolean } from "zod";

const props = defineProps({
  onTop: {
    type: boolean,
    default: false
  }
})

const toggleOrderDetails = ref(() => props.onTop ? false : true);

// formStore
const checkoutStore = useCheckoutStore();
const formStore = useFormStore();
const cartStore = useCartStore();
const siteStore = useSiteStore();
const productCart = computed(() => cartStore.productCart);
const subTotal = computed(() =>
{
  const data = siteStore.countryData[siteStore.selectedCountryCode];
  const basePrice = cartStore.subTotal;
  if (!data) return `$${basePrice.toFixed(2)}`;
  const convertedAmount = basePrice * data.exchangeRate;
  return formatCurrency(convertedAmount, data.currencyCode, data.locale);
});
const salesTax = computed(() => formatedPrices(cartStore.salesTax?cartStore.salesTax:0.00));
const shipping = computed(() => formatedPrices(cartStore.shipping?cartStore.shipping:0.00));
const cartLoading = computed(() => cartStore.cartLoading);
const discountLoading = computed(() => cartStore.discountLoading);
const shippingLoading = computed(() => cartStore.shippingLoading);
const salesTaxLoading = computed(() => cartStore.salesTaxLoading);
const cartTotalLoading = computed(() => cartStore.cartTotalLoading);
const vipOptIn = computed(() => checkoutStore.vipOptIn);
const shippingThreshold = computed(() => checkoutStore.shippingThreshold);
// const { cartLoading, cartEmpty } = cartStore;

// Prepare summary items
const summaryItems = computed(() => [
  { name: "Sub Total", value: subTotal, loading: false },
  { name: "Discount", value: formatedPrices(cartStore.discount?cartStore.discount:0.00), loading: discountLoading.value },
  { name: "Sales Tax", value: salesTax, loading: salesTaxLoading.value },
  { name: "Shipping", value: vipOptIn.value ? 'FREE' : shippingThreshold.value ? 'FREE' : shipping, loading: shippingLoading.value }, // Example static value
  { name: "Total", value: formatedPrices(+cartStore.cartTotal.toFixed(2)), loading: cartTotalLoading.value ? cartTotalLoading.value : false }, // Ensure this is a computed value
]);
// coupon code
const { removeCoupon } = cartStore;
const couponSuccess = ref(cartStore.couponSuccess);

// Checkout store
const transactionStatus = computed(() => checkoutStore.transactionStatus);

watch(
  () => cartStore.couponSuccess,
  (newCouponSuccessAvailable) => {
    couponSuccess.value = newCouponSuccessAvailable; // Update new coupon list after removal
  }
);
</script>
<style scoped>
.apply-btn {
  background: #ececec;
  border: 1px solid #c5c5c5;
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  height: 51px;
  width: 4.7rem !important;
}

.text-xs {
  font-size: 0.65rem;
  line-height: 1rem;
}

.text-brown {
  color: #a26b25 !important
}

@media (max-width: 640px) {
  .sm\:mt-6 {
    margin-top: 0.9rem;
  }
}
</style>