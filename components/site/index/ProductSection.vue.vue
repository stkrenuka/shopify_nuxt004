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
    selectImage, getValues
  } = useSiteProductCart("10090278125842"); // or any product ID
  //10090278125842
  //10098841485586
  onMounted(() => {
    getproduct();
  });
</script>
<template>
  <section id=""
    class="container mx-auto lg:flex justify-between items-start px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4  lg:py-10 ">
    <div class="lg:w-1/2 w-full flex items-start lg:justify-start justify-center">
      <NuxtImg id="mainImage" :src="image" alt="Image" loading="lazy"
        class="w-full object-cover mb-8 transition-all duration-500" />
    </div>
    <div class=" lg:w-1/2 w-full items-center lg:justify-end justify-center  lg:pl-12">
      <h2 class="text-4xl font-regular text-center tracking-widest my-4" style="font-family: 'Varela', sans-serif;">Brow
        {{ product.title }}</h2>
      <h3 class="text-center text-xl font-bold"> <del v-if="selectedVariant?.compare_at_price">
          $ {{ selectedVariant?.compare_at_price }}
        </del> <span class="text-[#8f51ac] pl-4">
          $ {{ selectedVariant?.price }}</span>
      </h3>
      <hr class="w-1/6 mx-auto border-t-4 border-black my-6">
      <div v-for="option in product.options" :key="option.id">
        <p class="text-center"> {{ option.name }}</p>
        <div class="flex flex-wrap justify-center gap-2">
        <div class="text-center px-3" v-for="(value, index) in getValues(option.values)" :key="index"
          @click="selectOption(option.name, value)">
          <button
            :class="['text-md font-medium uppercase py-1 px-2 hover:bg-gray-200',  isSelected(option.name, value) ? 'border-2 border-black' : '']">
            {{ value }}
          </button>
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