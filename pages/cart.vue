<script setup lang="ts">
import { useCartStore } from "~/stores";
import { removeSiteProduct } from '~/composables/useSiteProductCart';
definePageMeta({
  layout: "site",
});
const cartStore = useCartStore();
const productCart = computed(() => cartStore.productCart);
if (productCart.value.length < 1) {
  cartStore.loadingCart = true;
}
const subTotal = computed(() => cartStore.subTotal.toFixed(2));
function updateCartQuantity() {
  cartStore.updateProductQty();
}
onMounted(async () => {
  if (productCart.value.length < 1) {
    cartStore.checkSessionProductCart();
    cartStore.loadingCart = false;
  }
  await getCCProductId();
})
</script>
<template>
  <!-- Hero Section -->
  <section class="text-center pt-20 bg-cover bg-center">
    <div class="z-10">
      <h1 class="text-3xl text-black font-medium mb-6">
        Your Cart
        <hr class="w-16 mx-auto border-t-3 border-black my-6" />
      </h1>
    </div>
  </section>
  <!-- Cart Section -->
  <section
    class="container mx-auto lg:flex justify-between items-center py-10 px-4 max-w-[1050px] lg:px-7 sm:w-full lg:pb-40">
    <div class="w-full text-center">
      <PurchaseSpinner v-if="cartStore.loadingCart && !productCart.length" />
      <table class="w-4/5 mx-auto" v-if="productCart.length">
        <thead>
          <tr class="border-b border-black">
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th class="py-2 uppercase font-bold tracking-wide">Quantity</th>
            <th class="py-2 uppercase font-bold tracking-wide">Total</th>
          </tr>
        </thead>
        <tbody>
          <!-- Cart Item -->
          <tr class="border-b border-black" v-for="items in productCart">
            <td class="px-3 py-5">
              <NuxtImg :src="items.image" alt="Brow Charm Stencil Kit" class="w-32" loading="lazy" />
            </td>
            <td class="text-left text-wrap">
              <h2 class="font-semibold italic uppercase">{{ items.title }}</h2>
              <p>{{ items.variant_title }}</p>
              <button @click="removeSiteProduct(items.shopify_product_id, items.shopify_variant_id)"
                class="text-blue-500 hover:underline">Remove</button>
            </td>
            <td>
              <input type="number" min="1" class="pl-3 pr-1 py-2 bg-gray-200 w-16 text-center font-bold"
                v-model.number="items.product_qty" />
            </td>
            <td class="font-bold">${{ (items.price * items.product_qty).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Subtotal & Buttons (Outside Table) -->
      <div class="w-4/5 mx-auto mt-6 text-right" v-if="productCart.length">
        <!-- Subtotal -->
        <div class="mb-4">
          <span class="uppercase font-semibold tracking-wide mr-36">Subtotal:</span>
          <span class="font-bold">${{ subTotal }}</span>
        </div>
        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/cart" @click="updateCartQuantity"
            class="bg-[#8f51ac] text-white font-semibold uppercase text-md py-3 px-6 rounded-sm hover:bg-[#aa7ac0]">
            Update Cart
          </NuxtLink>
          <NuxtLink to="/checkout"
            class="bg-[#8f51ac] text-white font-semibold uppercase text-md py-3 px-6 rounded-sm hover:bg-[#aa7ac0] flex items-center justify-center">
            Checkout
            <ClientOnly>
              <i class="fas fa-arrow-right-long ml-2"></i>
            </ClientOnly>
          </NuxtLink>
        </div>
      </div>
      <div class="text-center flex justify-center" v-if="!cartStore.loadingCart && productCart.length < 1">
        <div>
          <NuxtImg src="/images/empty-cart.png" style="height: 100px !important" />
        </div>
        <div>
          <p class="pb-2">
            Your Cart is Empty
          </p>
          <p class="pt-2">
            Continue browsing <NuxtLink to="/" class="text-[#9153ad] underline">here</NuxtLink>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>