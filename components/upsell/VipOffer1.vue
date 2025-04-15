<script setup lang="ts">
import { inject } from 'vue';
import { useCheckoutStore } from "~/stores";
const handlePurchase = inject('handlePurchase');
const productVariants = inject('productVariants');
const mayBeLater = inject('mayBeLater');
const productDetailsVariantId = defineModel();
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);

</script>
<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=check" />
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <section id="main">
        <div class="container lg:max-w-screen-lg sm:w-full mx-auto shadow-lg lg:p-4  p-1 bg-white">
            <div class="">
                <h1 class="lg:text-4xl text-xl font-bold font-poppins text-black text-center py-2"><span
                        class="text-purple">Hurry...</span> Don't Miss Your <span class="text-purple">BONUS
                        OFFER!</span>
                </h1>
                <h2 class="lg:text-2xl text-md font-poppins font-semibold text-center text-black ">Get This Amazing
                    <span class="text-purple">One Time Offer</span> Today Only!
                </h2>
                <div class="flex-wrap flex">
                    <div class="lg:w-6/12 w-full lg:px-8 px-2">
                        <div class="vip-box">
                            <div class="top-box relative">
                                <h4 class="font-oswald font-semibold text-2xl">EXCLUSIVE OFFER</h4>
                                <div class="offer-cirle">
                                    <p class="text-sm">Save<br> {{ formatedPrices(465) }}</p>
                                </div>
                            </div>
                            <div class="main-box py-3 px-2">
                                <div class="flex flex-wrap">
                                    <div class="lg:w-2/12 w-full">
                                        <NuxtImg src="images/offer1/BrowCharm-VIP_image.png" loading="eager" alt="logo"
                                            class="lg:w-[3.5rem] w-[3.5rem]  mx-auto hidden lg:block " />
                                        <NuxtImg src="images/offer1/BrowCharm-VIP_image-mob.png" loading="eager"
                                            alt="logo" class="lg:w-10 w-50 mb-2  mx-auto lg:hidden" />
                                    </div>
                                    <div class="lg:w-10/12 w-full">
                                        <h4 class="lg:text-md text-base font-oswald font-semibold">
                                            2-Pack Brow Charm™ Stencil Kit
                                            <span class="text-right text-purple font-bold text-base pt-1">{{
                                                formatedPrices(80) }}
                                                Value</span>
                                        </h4>
                                        <h4 class="text-lg font-oswald font-semibold mb-1 mt-2">VIP Customer Benefits
                                        </h4>
                                        <p class="font-regular font-oswald"><span
                                                class="material-symbols-outlined">check</span>FREE Same Day Processing
                                            <span class="text-right text-purple font-medium">{{ formatedPrices(9.99) }}
                                                Value</span>
                                        </p>
                                        <p class="font-regular font-oswald"><span
                                                class="material-symbols-outlined">check</span>FREE Expedited Shipping
                                            <span class="text-right text-purple font-medium">{{ formatedPrices(9.99) }}
                                                Value</span>
                                        </p>
                                        <p class="font-regular font-oswald"><span
                                                class="material-symbols-outlined">check</span>FREE Monthly Products
                                            <span class="text-right text-purple font-medium">Over {{ formatedPrices(400)
                                                }} Value</span>
                                        </p>

                                    </div>
                                </div>
                                <div class="text-center">
                                    <h4 class="text-lg font-oswald font-semibold text-purple mt-2">Total Value Over
                                        $500!!</h4>
                                    <small class="font-medium">{{ formatedPrices(34.71) }}/mo. Zero Risk & 100%
                                        Satisfaction
                                        Guaranteed.</small>
                                </div>
                            </div>
                        </div>
                        <div class="relative lg:w-full sm:w-full mx-auto">
                            <p>Choose Color:</p>
                            <select v-model="productDetailsVariantId" class="w-full rounded-md p-3 appearance-none"
                                style="background-color: #E9E9E9;">
                                <option v-for="variants in productVariants" :value="variants.variantDetailId"> {{
                                    variants.title
                                }} </option>
                            </select>
                            <!-- Custom Arrow Icon -->
                            <div
                                class="absolute inset-y-0 right-3 top-5 text-3xl flex items-center pointer-events-none">
                                <NuxtImg src="/images/offer1/arrow-down.png" loading="eager" alt="logo" class="w-5 " />

                            </div>
                        </div>
                        <div class="lg:w-full flex flex-wrap lg:mt-5 mt-2">
                            <div class="lg:w-6/12 w-6/12 text-center">
                                <p class="font-poppins font-semibold text-gray-400">Total Value Over:</p>
                                <h3 class="font-poppins font-bold text-2xl text-gray-400"><del>{{ formatedPrices(500)
                                        }}</del></h3>
                            </div>
                            <div class="lg:w-6/12 w-6/12 text-center">
                                <p class="font-poppins font-semibold text-purple">Your Price Today</p>
                                <h2 class="font-poppins font-bold text-3xl text-purple">{{ formatedPrices(34.71) }}</h2>
                            </div>
                        </div>
                        <div class="mx-auto text-center block">
                            <button v-if="!transactionStatus" @click="handlePurchase"
                                class="purple text-white text-2xl py-3 px-4 lg:w-full w-full lg:mt-7 mt-2 shadow-lg font-poppins font-semibold capitalize sm:w-full">Complete
                                My Order</button>
                            <PurchaseSpinner v-if="transactionStatus" />

                            <div class="text-center mt-4 lg:mb-7 mb-2">
                                <button @click="mayBeLater"
                                    class="text-gray-800 font-poppins font-semibold text-1xl cursor-pointer underline"
                                    id="openModal">
                                    No thanks, I don't want this deal.
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-6/12 w-full p-4">
                        <NuxtImg src="images/offer1/bc-vip.png" loading="eager" alt="logo"
                            class="lg:w-5/6 md:w- sm:w-full mx-auto mt-6 mb-3" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="footer" class="">
        <div class="container mx-auto lg:w-3/4 py-10">
            <div class="copyright text-center">
                <NuxtImg src="images/logo.png" loading="eager" alt="logo" class="w-40 mx-auto" />
                <p class="font-poppins mt-4 font-medium text-sm">© 2025, Brow Charm</p>
            </div>
        </div>
    </section>
</template>
<style scoped>
p {
    padding: 0;
}

.purple {
    background: #8f51ac !important;
}

.font-poppins {
    font-family: "Montserrat", serif;
}

.font-oswald {
    font-family: "Oswald", serif;
}

section#main {
    background: #f1f4f8;
}

.bg-purple {
    background: #8f51ac;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

section#footer {
    background: #f1f4f8;
}

.bg-gray {
    background: #D9D9D9;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

span.material-symbols-outlined {
    position: relative;
    top: 5px;
    font-size: 20px;
}

.vip-box {
    background: #F7F7F7;
    border-radius: 13px;
    border: 1px solid #939393;
    margin: 25px auto;
}

.offer-cirle {
    background: #000;
    position: absolute;
    right: -20px;
    border-radius: 70%;
    padding: 19px 0px;
    border: 3px dashed #fff;
    font-size: 13px;
    text-transform: uppercase;
    top: -15px;
    width: 85px;
    height: 85px;
    font-weight: 400;
}

.text-purple {
    color: #8f51ac;
}

.main-box span.text-right {
    float: right;
}

.top-box {
    background: #8f51ac;
    padding: 10px;
    color: #fff;
    text-align: center;
    font-size: 21px;
    font-weight: 700;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.animate {
    transform: rotate(360deg);
    opacity: 1;
}

@media (min-width:300px) and (max-width:640px) {
    p {

        font-size: 13px !important;
    }

    .d-none {
        display: none;

    }
}
</style>