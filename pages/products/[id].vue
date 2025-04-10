<script setup lang="ts">
import { object } from 'zod';

definePageMeta({ layout: "site" });
const route = useRoute();
const productId = route.params.id as string;
const {
  product,
  variants,
  selectedQuantity,
  image,
  images,
  selectedOptions,
  selectedVariant,
  getproduct,
  addToCart,
  selectOption,
  isSelected,
  selectImage,
  getValues,
} = useSiteProductCart(productId); // or any product ID
//10090278125842
//10098841485586
onMounted(async() => {
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
                            @click="selectImage(image.src)" style="height:90px"/>
                    </div>

                </div>
            </div>
        </div>
        <div class="lg:w-1/2 w-full items-center lg:justify-end justify-center lg:pl-12">
            <h2 class="text-4xl font-medium text-center tracking-wide my-4" style="font-family: 'Varela', sans-serif;">
                {{ product.title }}
            </h2>
            <h3 class="text-center text-xl font-bold">
                <del class="text-gray-500" v-if="selectedVariant?.compare_at_price">
                    $ {{ selectedVariant?.compare_at_price }}
                </del>
                <span class="text-[#8f51ac] pl-4">
                    $ {{ selectedVariant?.price }}
                </span>
            </h3>
            <hr class="w-1/6 mx-auto border-t-1 border-black my-3">
            <!----------------------------start-->

            <div v-if="product.options?.[0]?.values?.[0]?.value !== 'Default Title'">
            <div v-for="option in product.options" :key="option.id">
                <p class="text-center font-bold">
                    {{ option.name }}
                </p>

                <div class="text-center py-4">
                    <span v-for="(value, index) in getValues(option.values)" :key="index"
                        @click="selectOption(option.name, value)">
                        <button :class="[
                            'text-md font-medium uppercase py-1 px-2 hover:bg-gray-200',
                            isSelected(option.name, value) ? 'border-2 border-black' : ''
                        ]">
                            {{ value }}
                        </button>
                    </span>
                </div>
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