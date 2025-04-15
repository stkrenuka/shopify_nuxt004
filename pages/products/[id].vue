<script setup lang="ts">
import { object } from 'zod';
import { useSiteStore } from "~/stores";
const siteStore = useSiteStore();

definePageMeta({ layout: "site" });
const route = useRoute();
const productId = route.params.id as string;
const {
    product,
    variants,
    selectedQuantity,
    image,
    images,
    selectedVariant,
    getproduct,
    addToCart,
    selectOption,
    isSelected,
    selectImage,
    getValues,
    getSelectedValue,
    selectedVariantPrice,
    selectedVariantCompareAtPrice
} = useSiteProductCart(productId);
const localizedConvertedPrice = computed(() => {
  return formatedPrices(selectedVariantPrice.value);
});
const localizedConvertedCaompredPrice= computed(() => {
  return formatedPrices(selectedVariantCompareAtPrice.value);
});
// or any product ID
onMounted(async () => {
    await getproduct();

});
</script>
<template>
    <section id=""
        class="container mx-auto lg:flex justify-between items-start px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4 lg:py-20  sm:pb-[3rem]">
        <div class="lg:w-1/2 w-full flex lg:justify-start justify-center">
            <div class="product-imgs">
                <div class="img-display">
                    <div class="img-showcase">
                        <NuxtImg :src="image" alt="Selected Product Image" class="object-cover" />

                    </div>
                </div>
                <div class="img-select">
                    <div class="img-item w-1/6" v-for="image in images">
                        <NuxtImg :src="image.src" alt="" class="border-black border" loading="lazy"
                            @click="selectImage(image.src)" />
                    </div>

                </div>
            </div>
        </div>
        <div class="lg:w-1/2 w-full items-center lg:justify-end justify-center lg:pl-12">
            <h2 class="text-4xl font-medium text-center tracking-wide my-4" style="font-family: 'Varela', sans-serif;"
                v-if="product.title">
                {{ product.title }}
            </h2>

            <h3 class="text-center text-xl font-bold">

                <del class="text-gray-500" v-if="selectedVariantCompareAtPrice">
                    {{ localizedConvertedCaompredPrice }}
                </del>
                <span class="text-[#8f51ac] pl-4">
                    {{ localizedConvertedPrice }}
                </span>
            </h3>
            <hr class="w-1/6 mx-auto border-t-1 border-black my-3">
            <!----------------------------start-->

            <div v-if="product.options">
                <div v-if="product.options?.[0]?.values?.[0]?.value !== 'Default Title'">
                    <div v-for="option in product.options" :key="option.id">
                        <p class="text-center font-bold">
                            {{ option.name }}
                        </p>
                        <div class="flex flex-wrap justify-center gap-2">
                            <div class="text-center py-4" v-if="option">
                                <!-- Show buttons if 5 or fewer options -->
                                <template v-if="getValues(option.values).length <= 7">
                                    <span v-for="(value, index) in getValues(option.values)" :key="index"
                                        @click="selectOption(option.name, value)">
                                        <button :class="[
                                            'text-md font-medium uppercase py-1 px-2 hover:bg-gray-200',
                                            isSelected(option.name, value) ? 'border-2 border-black' : ''
                                        ]">
                                            {{ value }}
                                        </button>
                                    </span>
                                </template>

                                <!-- Show select dropdown if more than 5 options -->
                                <template v-else>
                                    <select
                                        class="text-md font-medium uppercase py-2 px-3 border border-gray-300 rounded"
                                        @change="selectOption(option.name, $event.target.value)">
                                        <option disabled value="">Select an option</option>
                                        <option v-for="(value, index) in getValues(option.values)" :key="index"
                                            :value="value">
                                            {{ value }}
                                        </option>
                                    </select>
                                </template>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else>
                <div role="status" class="flex justify-center mb-2">
                    <svg aria-hidden="true" class="w-5 h-w-5 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </div>
            </div>
            <!--------------------end-->
            <div class=" text-center flex">
                <label class="font-bold px-4 py-3">
                    Quantity
                </label>
                <input type="number" name="qty" v-model="selectedQuantity" min="1"
                    class="p-3 bg-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div class="text-center py-9">
                <button @click="addToCart"
                    class="bg-[#8f51ac] w-full font-semibold uppercase text-base text-white py-3 block rounded-sm hover:bg-[#aa7ac0]"
                    tabindex="0">
                    Add to Cart
                </button>
            </div>
            <SiteProductFeature :bodyHtml="product.body_html" />
        </div>

    </section>
</template>


<style scoped>
img.border-black.border {
    height: 90px;
}

@media (max-width:600px) {
    img.border-black.border {
        height: 70px;
    }
}
</style>