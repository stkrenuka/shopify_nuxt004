<script lang="ts" setup>
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
  selectImage, getValues,
  selectedVariantPrice,
  selectedVariantCompareAtPrice
} = useSiteProductCart("10098841485586"); // or any product ID
//10090278125842
//10098841485586
const localizedConvertedPrice = computed(() => {
  return formatedPrices(selectedVariantPrice.value);
});
const localizedConvertedCaompredPrice= computed(() => {
  return formatedPrices(selectedVariantCompareAtPrice.value);
});

onMounted(() => {
  getproduct();
});
</script>
<template>
  <section id=""
    class="container mx-auto lg:flex justify-between items-start px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4  lg:py-10 ">
    <div class="lg:w-[56.333%] w-full flex items-start lg:justify-start justify-center">
  <NuxtImg
    id="mainImage"
    :src="image"
    alt="Product Image"
    loading="lazy"
    height="500"
    width="500"
    quality="50"
    format="webp"
     class="w-full object-cover mb-8 transition-all duration-500"
  />
</div>
    <div class="lg:w-[41.666%] w-full items-center lg:justify-end justify-center  lg:pl-3">
      <h2 class="text-4xl font-regular text-center tracking-widest my-4" style="font-family: 'Varela', sans-serif;">Brow
        {{ product.title }}</h2>
      <h3 class="text-center text-xl font-bold"> <del v-if="selectedVariant?.compare_at_price">
         {{ localizedConvertedCaompredPrice }}
        </del> <span class="text-[#8f51ac] pl-4">
          {{ localizedConvertedPrice }}</span>
      </h3>
      <hr class="w-1/6 mx-auto border-t-4 border-black my-6">
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


      <div class="text-center py-4 mt-5">
        <button @click="addToCart()"
          class="bg-[#8f51ac] font-semibold uppercase text-sm text-white py-3 px-6 rounded-sm hover:bg-[#aa7ac0]"
          tabindex="0">
          Add to Cart
        </button>
      </div>
      <div class="text-center py-4">
        <NuxtLink to="/products/brow-charm-stencil-kit?variant=40739093479618&amp;_atid=SvJgjcnb1321t2ChrnpkmOP38NvfZ6"
          class="text-[#8f51ac]">
          Full details <i class="fas fa-arrow-right-long"></i>
        </NuxtLink>
        <div class="flex  lg:justify-center justify-center  ">
          <p class="lg:w-1/6 w-full text-xs mr-5">
            <ClientOnly>
              <i class="fab fa-facebook-f"></i>
            </ClientOnly> Share
          </p>
          <p class="lg:w-1/6 w-full text-xs mr-5">
            <ClientOnly>
              <i class="fab fa-twitter"></i>
            </ClientOnly> Tweet
          </p>
          <p class="lg:w-1/6 w-full text-xs lg:justify-start justify-end">
            <ClientOnly>
              <i class="fab fa-pinterest-p"></i>
            </ClientOnly> Pin it
          </p>
        </div>
      </div>
    </div>
  </section>
</template>