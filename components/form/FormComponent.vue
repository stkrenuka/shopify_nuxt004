<template>
  <form @submit.prevent="">
    <div class="flex flex-col lg:flex-row w-full mx-auto">
      <div class="lg:w-1/2 flex justify-end">
        <!-- left -->
        <div class="lg:w-[680px] sm:w-full lg:px-0 lg:pr-10">
          <div class="left-div ">
            <div class="bg-gray-custom faq border border-gray-200 md:hidden lg:hidden px-4 py-4">
              <!-- Header -->
              <div @click="() => toggleOrderDetails = !toggleOrderDetails"
                class="flex justify-between items-center py-4">
                <p class="flex text-brown items-center gap-1 text-sm sm:text-base font-medium">Show order summary
                  <NuxtImg :src="toggleOrderDetails ? '/images/arrow-up.svg' : '/images/arrow-down.svg'" alt="arrow"
                    width="20" height="20" />
                </p>
                <p class="text-sm sm:text-base font-semibold">${{ cartStore.cartTotal.toFixed(2) }}</p>
              </div>
              <div v-if="toggleOrderDetails" class="">
                <Cart :onTop="true" />
              </div>
              <VipDetails />
            </div>
            <div class="m-4 lg:mt-10">
              <div class="text-center">
                <p class="mb-0 text-sm">Express checkout</p>
                <button @click="submitPaypal"
                  class="px-4 py-2 mb-3 bg-[#ffd11a] text-white rounded-md hover:bg-[#ffd11a] w-full">
                  <img src="/images/paypal-checkout-3.png" class="w-40 mx-auto">
                </button>
              </div>
              <div class="flex items-center justify-center mt-6 mb-0">
                <hr class="flex-grow border-t border-gray-300">
                <span class="px-3 text-gray-400">OR</span>
                <hr class="flex-grow border-t border-gray-300">
              </div>
              <CustomerInfo :formValues="formStore.formValues" :errors="formStore.errors" />
              <div class="spacer"></div>
              <ShippingInfo :formValues="formStore.formValues" :errors="formStore.errors" />
              <div class="spacer"></div>
              <div class="spacer"></div>
              <!-- Shipping Methods -->
              <h2 class="mt-4 font-semibold text-[16px]">Shipping method</h2>
              <CustomSelect v-if="formStore.formValues.country || formStore.formValues.billingCountry"
                v-model="formStore.formValues.shippingMethod" :errorMessage="formStore.errors.shippingMethod"
                :options="checkoutStore.vipOptIn ? shippingStore.freeShipping : checkoutStore.shippingThreshold ? shippingStore.freeShipping : shippingStore.shippingMethods"
                placeholder="Select Shipping Method" optionsValue="shipProfileId" displayName="profileName" />
              <div v-else class="bg-[#F5F5F5] border rounded-md border-gray-300 py-[6px] px-[12px]">
                <p class="xl:text-sm text-xs text-[#707070]">Enter your shipping country to view available shipping
                  methods.
                </p>
              </div>

              <PaymentInfo :formValues="formStore.formValues" :errors="formStore.errors" />
              <!-- Mobile View order Details -->
              <section class="lg:hidden md:hidden">
                <Cart />
              </section>
              <Spacer />
              <CustomButton v-if="formStore.formValues.paymentMethod !== 'PAYPAL' && !transactionStatus"
                placeholder="Pay Now" size="large" @click="formStore.handleSubmit" buttonType="submit" />
              <PurchaseSpinner v-if="transactionStatus" />
              <hr class="mt-6">
              <div class="small-text mt-0" >
                <p>By proceeding to Shipping updates you agree to Privacy Policy and consent to receive recurring
                  SMS/texts for order confirmations, exclusive offers and early access to new products. You don't need
                  to consent to continue to purchase. You can unsubscribe at any time. Standard message and data rates
                  apply.
                  View Privacy Policy and TOS</p>
              </div>
              <CheckoutFooter />
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/2 bg-white lg:bg-[#F5F5F5] border-l border-l-gray-300 ">
        <!-- right -->
        <div class="pb-10 lg:w-[720px] w-full px-4
        chk-right">
          <div class="right-div lg:px-8 py-9 px-3 sticky top-0">
            <Cart />
            <div class="hidden lg:block">
              <VipDetails />
            </div>
            <div class="spacer"></div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { useFormStore, useCartStore, useCheckoutStore, useShippingStore } from "~/stores";
import CustomerInfo from "./CustomerInfo.vue";
import PaymentInfo from "./PaymentInfo.vue";
import ShippingInfo from "./ShippingInfo.vue";
import Spacer from "../Spacer.vue";
import CustomButton from "../CustomButton.vue";
import Cart from "../orderSummary/Cart.vue";
import VipDetails from "../vipBox/VipDetails.vue";
useHead({
  script: [
    {
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXA_xtbuQE7O7XGFwTKFvToUiiEpALAAg&libraries=places',
      async: true,
      defer: true,
    }
  ]
});
const toggleOrderDetails = ref(false);

// FormStore
const formStore = useFormStore();
const shippingStore = useShippingStore();
// cartStore
const cartStore = useCartStore();
const cartLoading = computed(() => cartStore.cartLoading);
const { removeCoupon } = cartStore;
// const couponError = ref(() => cartStore.couponError);
const couponSuccess = ref(cartStore.couponSuccess);
// Checkout store
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);
watch(
  () => cartStore.couponSuccess,
  (newCouponSuccessAvailable) => {
    couponSuccess.value = newCouponSuccessAvailable; // Update new coupon list after removal
  }
);
function submitPaypal() {
  formStore.formValues.paymentMethod = 'PAYPAL';
  formStore.handleSubmit();

}
</script>
<style>
.red-text {
  color: #D40000;
}

.bg-yellow-custom {
  background: #fec53b;
}

.or-div,
hr.or-hr {
  position: relative;
  margin-top: 20px;
}

.text-brown {
  color: #a26b25 !important
}

button.px-4.py-1.bg-yellow-custom.text-white.rounded-lg.hover\:bg-yellow-custom.w-full {
  background-color: #fec53b;
}

.small-text p {
  color: #a26b25;
  display: block;
  font-size: 13px;
  text-align: justify;
  text-decoration: none;
}

p.text-center.or-p {
  background: #fff;
  color: #8f8f8f;
  display: flow-root;
  margin: 0 auto;
  position: relative;
  width: 60px;
  z-index: 99;
}

hr.or-hr {
  top: -30px;
}

.pay-box input[type="radio"] {
  display: block;
  position: absolute;
  z-index: 10;
  width: 40px;
  margin-top: 20px;
  height: 17px;
}

.pay-box label {
  display: block;
  padding: 15px 40px;
  margin: 0 0 1px 0;
  cursor: pointer;
  background: #ffffff;
  border-radius: 3px;
  color: #000;
  transition: ease .5s;
  position: relative;
  border: 1px solid #dadada;
}

.chk-right {
  position: sticky !important;
  display: block;
  top: 0;
}

.pay-box label:hover {
  background: #fff;
}

.bg-green-custom {
  background: #00C2CB;
}

.pay-box .content {
  background: #E2E5F6;
  padding: 10px 25px;
  border: 1px solid #A7A7A7;
  margin: 0 0 1px 0;
  border-radius: 3px;
}

.pay-box input+label+.collapse {
  display: none;
}

.pay-box input:checked+label+.collapse {
  display: block;
}

.card-cls {
  position: absolute;
  top: 14px;
  right: 10px;
}

.collapse {
  visibility: visible;
}

.bg-gray-custom {
  background: #F5F5F5;
}

.quantity-circle {
  background: #333;
  border-radius: 60%;
  width: 24px;
  height: 24px;
  color: #fff;
  padding: 0px 7px 12px 8px;
  position: absolute;
  top: 0px;
  right: -8px;
}

/* .faq input[type="checkbox"] {
  display: none;
} */

.faq label {
  display: block;
  padding: 12px 22px;
  margin: 0 0 1px 0;
  cursor: pointer;
  background: #f5f5f5;
  border-radius: 3px;
  color: #333;
  transition: ease .5s;
  position: relative;
  /* ADDING THIS IS REQUIRED */
  font-weight: 700;
}

.faq label:hover {
  background: #f5f5f5;
}

.faq label::after {
  content: '↓';
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  margin: 5px;
  top: 2px;
}

.faq input:checked+label::after {
  content: '↑';
  margin: 5px;
  top: 3px;
}

.faq .content {
  background: #E2E5F6;
  padding: 10px 25px;
  border: 1px solid #A7A7A7;
  margin: 0 0 1px 0;
  border-radius: 3px;
}

.faq input+label+.collapse {
  display: none;
}

.faq input:checked+label+.collapse {
  display: block;
  padding: 20px 20px;
  border: 1px solid #cbcbcb;
}


@media (min-width:300px) and (max-width:500px) {
  .h2-text {
    background: #fff;
  }
}
</style>
<style scoped>
.lg\:pr-8 {
  padding-right: 1.5rem;
}

.lg\:pl-20 {
  padding-left: 3.5rem;
}

.w-40 {
  width: 8rem;
}

.py-2 {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}

@media (max-width: 868px) {
  .md\:pl-4 {
    padding-left: 1rem;
  }
}

@media (max-width: 640px) {
  .sm\:pl-0 {
    padding-left: 0px;
  }

  .sm\:mr-3 {
    margin-right: 0px;
  }
}
</style>