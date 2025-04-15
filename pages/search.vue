<script lang="ts" setup>
  import { useSiteStore } from "~/stores";
  import { getSearchProducts } from '~/composables/useSiteProductCart';
  definePageMeta({ layout: "site" });
  const route = useRoute();
  const rawQuery = route.query.query;
  const siteStore = useSiteStore();
  siteStore.searchQuery =
    typeof rawQuery === 'string' ? rawQuery :
      Array.isArray(rawQuery) ? rawQuery.join(', ') :
        '';
  const products = ref(await getSearchProducts());
  async function search (){
    products.value = await getSearchProducts();
  }
  onMounted(()=>{
    siteStore.isSearchOpen = false;
})

</script>
<template>
  <section
    class="container mx-auto lg:flex-row justify-between items-center px-4  max-w-[1100px] lg:px-7 sm:w-full sm:px-4">
    <h1 class=" bg-white flex  items-center justify-center text-3xl pt-20 w-full">

      {{ siteStore.searchResultMsg }}
    </h1>
    <div class="flex justify-center  pt-5  pb-20">
      <div class="w-10 h-[1px] bg-black"></div>
    </div>
    <div class="inset-0 bg-white flex items-center justify-center z-50 mb-10">
      <div class="relative flex items-center">
        <form  @submit.prevent="search">
          <input type="text" placeholder="Search our store" v-model="siteStore.searchQuery"
          class="p-[0.85rem] h-12 text-xl bg-gray-100 italic focus:outline-none focus:ring-2 focus:ring-[#9152ac]"
          autofocus>
        <button type="submit"
          class="bg-[#9152ac] p-3 h-12 w-[4rem]  text-white hover:text-[#9152ac] hover:bg-gray-100">
          <ClientOnly>
            <i class="fas fa-search"></i>
          </ClientOnly>
        </button>
        </form>
      </div>
      <button class="absolute top-4 right-4 text-2xl">&times;</button>
    </div>
    <div class="bg-white py-10 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.shopify_product_id" class="text-center">
          <NuxtLink :to="`/products/${product.shopify_product_id}`">
            <div class="relative bg-gray-100 flex items-center justify-center">
              <img :src="product.image.src" class="h-80" />
              <div v-if="product.first_variants.compare_at_price"
                class="absolute top-2 left-2 bg-white text-[#9152ac] border border-[#9152ac] rounded-full text-xs px-3 py-1 font-semibold">
                SAVE<br />{{ formatedPrices((product.first_variants.compare_at_price - product.first_variants.price) )}}
              </div>
            </div>
            <h3 class="mt-4 font-medium text-lg italic">{{ product.title }}</h3>
            <p class="mt-1 text-gray-800 font-semibold">— {{formatedPrices(product.first_variants.price)  }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
</style>