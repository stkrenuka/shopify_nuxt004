<script lang="ts" setup>
  import { useSiteStore } from "~/stores";
  import { getSearchProducts } from '~/composables/useSiteProductCart';
  definePageMeta({ layout: "site" });
  const route = useRoute();
  const rawQuery = route.query.query;
  const siteStore = useSiteStore();
  siteStore.isSearchOpen = false;
  siteStore.searchQuery =
    typeof rawQuery === 'string' ? rawQuery :
      Array.isArray(rawQuery) ? rawQuery.join(', ') :
        '';
  const products = ref(await getSearchProducts());
  async function test (){
    products.value = await getSearchProducts();
  }


console
</script>
<template>
  <h1 class=" bg-white flex items-center justify-center">
    {{siteStore.searchResultMsg}}
  </h1>
  <div class="inset-0 bg-white flex items-center justify-center z-50">
    <div class="relative flex items-center">
      <input type="text" placeholder="Search our store" v-model="siteStore.searchQuery"
        class="p-[0.85rem] text-xl border-2 border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#9152ac]"
        autofocus>
      <button @click="test()"
        class="bg-[#9152ac] p-4 rounded-r-lg border-2 border-[#9152ac] text-white hover:text-[#9152ac] hover:bg-gray-100">
        <ClientOnly>
          <i class="fas fa-search"></i>
        </ClientOnly>
      </button>
    </div>
    <button class="absolute top-4 right-4 text-2xl">&times;</button>
  </div>
  <div class="bg-white py-10 px-4">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div v-for="product in products" :key="product.shopify_product_id" class="text-center" >
        <NuxtLink :to="`/products/${product.shopify_product_id}`">
          <div class="relative">
          <img :src="product.image.src" />
          <div v-if="product.first_variants.compare_at_price"
            class="absolute top-2 left-2 bg-white text-purple-700 border border-purple-500 rounded-full text-xs px-3 py-1 font-semibold">
            SAVE<br />${{(product.first_variants.compare_at_price - product.first_variants.price).toFixed(2)}}
          </div>
        </div>
        <h3 class="mt-4 font-medium text-lg italic">{{product.title}}</h3>
        <p class="mt-1 text-gray-800 font-semibold">— ${{product.first_variants.price}}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style>
</style>