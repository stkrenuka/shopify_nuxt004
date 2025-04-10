<script setup lang="ts">
definePageMeta({
    layout: "site",
});

const product = ref<any>({});
const colorOptions = ref<string[]>([]);
const quantityOptions = ref<string[]>([]);
const variants = ref<any[]>([]);
const selectedColor = ref<string>("");
const selectedQuantity = ref<string>("");
const image = ref<string>("");
const images=ref<string[]>([])
async function getproduct() {
    try {
        const response = await siteApiHandler("getProduct", "10098841485586");

        if (!response || !response.length) {
            console.error("No product data found");
            return;
        }

        product.value = response[0];

        // Ensure options exist before accessing
        if (product.value.options?.length > 0) {
            // colorOptions.value = response[0].options[1].values[0].value.split(", ").map(item => item.trim());
            // quantityOptions.value = response[0].options[0].values[0].value.split(", ").map(item => item.trim());
        }

        if(product.value.image)
        {
            image.value=product.value.image.src;

        }
        if (product.value.images?.length > 0) {
            images.value=product.value.images;
        }


        // Ensure variants exist
        variants.value = product.value.variants || [];

        // Set default selected color based on product data
        selectedColor.value = colorOptions.value[0];
        selectedQuantity.value = quantityOptions.value[0];

    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

// Fetch product data on mount
getproduct();
const selectedVariant = computed(() => {
    return variants.value.find(
        (v) => v.option1 === selectedColor.value && v.option2 === selectedQuantity.value
    );
});

const addToCart = () => {
    console.log("Added to cart:", selectedVariant.value);
};

const selectImage =(imgSrc: string) =>{
    image.value = imgSrc;
}
watch(selectedVariant, (newVariant) => {
  // When color or quantity changes, auto update the image
  if (newVariant?.variant_image?.src) {
    image.value = newVariant.variant_image.src;
  }
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
                        <button v-for="(color, index) in colorOptions" :key="index"
                            class="border p-1 focus:ring-2 focus:ring-purple-500">
                            <NuxtImg src="" alt="" class="w-full" loading="lazy" />
                        </button>
                    </div>
                </div>
                <div class="img-select">
                    <div class="img-item" v-for="image in images">
                        <NuxtImg :src="image.src" alt="" class="border-black border" loading="lazy"  @click="selectImage(image.src)"/>
                    </div>

                </div>
            </div>
        </div>
        <div class="lg:w-1/2 w-full items-center lg:justify-end justify-center lg:pl-12">
            <h2 class="text-4xl font-medium text-center tracking-wide my-4" style="font-family: 'Varela', sans-serif;">
             {{ product.title}}
            </h2>
            <h3 class="text-center text-xl font-bold">
                <del class="text-gray-500">
                    $ {{ selectedVariant?.compare_at_price }}
                </del>
                <span class="text-[#8f51ac] pl-4">
                    $ {{ selectedVariant?.price }}
                </span>
            </h3>
            <hr class="w-1/6 mx-auto border-t-1 border-black my-3">
            <p class="text-center font-bold">
                Color
            </p>

            <div class="text-center py-4">
                <span v-for="(color, index) in colorOptions" :key="index" @click="selectedColor = color">
                    <button :class="[
                        'text-md font-medium uppercase py-1 px-2 hover:bg-gray-200',
                        selectedColor === color ? 'border-2 border-black' : ''
                    ]" v-if="color">
                        {{ color }}
                    </button>
                </span>

            </div>


            <p class="text-center">
                Quantity
            </p>
            <div class="text-center py-4">
                <button v-for="(pack, index) in quantityOptions" @click="selectedQuantity = pack"
                    :class="['option-btn text-md font-medium uppercase py-1 px-2 hover:bg-gray-200', selectedQuantity == pack ? 'border border-black' : '']">
                    {{ pack }}
                </button>

            </div>
            <div class=" text-center flex">
                <label class="font-bold px-4 py-3">
                    Quantity
                </label>
                <input type="number" name=""
                    class="p-3 bg-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500" value="1">
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