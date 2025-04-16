<template>
  <tr class="">
    <td class="" width="13%">
      <div class="relative">
        <NuxtImg :src="optimizedImageUrl" class="border rounded-s-lg object-contain w-96" :transform="{
          quality: 75,
          format: 'webp',
        }" loading="lazy" sizes="(max-width: 940px) 180px" />
        <div v-if="item.product_qty"
          class="bg-[#333333a1] rounded-full w-6 h-6 text-white flex items-center justify-center absolute -top-2 -right-3 text-sm">
          {{ item.product_qty }}
        </div>
      </div>
    </td>
    <td class="p-2 text-sm lg:pl-8 lg:w-3/4">
      <div :class="{ 'text-[#ef476f] font-medium': item.product_id == '1' }">{{ item.title }}</div>
      <div :class="{ 'text-[#8f8f8f]': item.product_id == '1' }">{{ item.variant_title }}</div>
    </td>
    <td class="p-4 text-right">{{ getLocalizedItemTotal(item.price,1) }}</td>
  </tr>
</template>

<script setup lang="ts">
import CartItemSkeleton from "./CartItemSkeleton.vue";
import { getLocalizedItemTotal } from '~/composables/useSiteProductCart';


// Define the props for the component
const props = defineProps<{
  item: {
    product_id: string;
    image: string;
    product_qty: number;
    title: string;
    variant_title: string;
    price: number;
  };
}>();

// Create a computed property to handle the optimized image URL
const optimizedImageUrl = computed(() => {
  // Access the item through props
  if (props.item.product_id == '1') return props.item.image;
  return `${props.item.image}?quality=50&format=webp`;
});
</script>

<style scoped>
.text-xs {
  font-size: 0.55rem !important;
  line-height: 1rem;
}
</style>
