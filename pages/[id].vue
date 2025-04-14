<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import { useCheckoutStore } from "~/stores";
import VipOffer1 from '~/components/upsell/VipOffer1.vue';
const checkoutStore = useCheckoutStore();

const route = useRoute();
const router = useRouter();
const pageKey = route.params.id;
const productVariants = ref({});
const pageData = upsellConfig[pageKey];
definePageMeta({
    layout: 'custom',
    middleware: async () => {
        const route = useRoute();
        const router = useRouter();
        const pageKey1 = route.params.id;
        if(pageKey1) {
            if (!upsellConfig[pageKey1]) {
            router.push({ path: '/not-found' });
        }
        }

    }
})
const isDownsellModalOpen = ref(false);
const { addPageType, addRequestUri } = checkoutStore;
const vipOptIn = storage.getLocalItem('vipOptIn');
const transactionStatus = computed(() => checkoutStore.transactionStatus);
addPageType(pageData.pageType);
onMounted(async () => {
    await checkSteps();
    // addStoredParamsToUrl()
    const newQuery = mergeParams({});
    router.push({ query: newQuery });
    fbCAPI(pageData.event);
    dataLayer(pageData.event)
    upsell();
});
const productDetails: any = ref({
    productId: "",
    product1_id: "",
    product2_id: "",
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: pageData.nextStep.yes,
    stepCompleted: pageData.stepCompleted.yes,
})
const upsell = async () => {
    let productsId: number;
    let vipProductID: number;
    if (!vipOptIn && pageKey == 'offer1') {
        productsId = useRuntimeConfig().public.vipoffer1;
        vipProductID = useRuntimeConfig().public.vipProduct;
    }
    else {
        productsId = getUpsellproId(route.params.id);
    }
    await getRequestUri().then(url => addRequestUri(url));
    const { productId, price, title, variants } = await upsellProducts(productsId);
    productVariants.value = variants;
    if (!vipOptIn && pageKey == 'offer1') {
        productDetails.value.product1_id = productsId;
        productDetails.value.product2_id = vipProductID;
    }
    else {
        productDetails.value.productId = productsId;

    }

    if (variants.length != 0) {
        productDetails.value.variantDetailId = variants[0].variantDetailId;
    }
    // productDetails.value.productPrice = price;
    productDetails.value.stepCompleted = pageData.stepCompleted.yes;
    productDetails.value.title = title;
    importClick();
}
const handlePurchase = async () => {
    productDetails.value.productQty = 1;
    importUpsell(productDetails.value);
}
const mayBeLater = async () => {
    if (pageKey == 'offer4') {
        openupsellModal(); return;
    }
    checkoutStore.setStepCompleted(pageData.stepCompleted.no);
    router.push({ path: pageData.nextStep.no });
}
function openupsellModal() {
    isDownsellModalOpen.value = true;
}
async function closeupsellModal() {
    checkoutStore.setStepCompleted(8);
    await router.push({ path: '/thankyou' });
}

function handleDownsell() {
    productDetails.value.productId = useRuntimeConfig().public.offerDownsell4;
    handlePurchase();
}
provide('handlePurchase', handlePurchase);
provide('productVariants', productVariants);
provide('mayBeLater', mayBeLater);
</script>
<template>
    <VipOffer1 v-if="!vipOptIn && pageKey == 'offer1'" v-model="productDetails.variantDetailId" />
    <section v-else id="main">
        <div class="container lg:w-3/4 sm:w-full mx-auto shadow-lg p-4 bg-white">
            <div class="">
                <h1 class="text-3xl font-semibold font-poppins text-black text-center py-2">{{ pageData.header }}</h1>
                <h4 class="text-lg font-poppins font-medium text-center text-black ">{{ pageData.heading }}</h4>
                <NuxtImg :src="pageData.productImg" loading="eager" alt="logo"
                    class="lg:w-2/3 md:w- sm:w-full mx-auto mt-6" />
                <h5 v-if="pageKey !== 'offer4'"
                    class="text-1xl font-poppins font-medium text-center text-black py-3 lg:w-1/2 mx-auto mt-4 sm:w-full">
                    <span v-for="(kits, index) in pageData.kitPrice" :key="index">
                        <b class="text-red-500">{{ kits.kit }}:</b> ${{ kits.price }} <span v-if="index < 2"> | </span>
                    </span>
                </h5>
                <div v-if="pageKey !== 'offer4'" class="relative lg:w-2/3 sm:w-full mx-auto">
                    <select v-model="productDetails.variantDetailId"
                        class="w-full border border-gray-300 rounded-md p-3 bg-white appearance-none focus:ring-2 focus:ring-indigo-500">
                        <option v-for="variants in productVariants" :value="variants.variantDetailId"> {{ variants.title
                        }} </option>
                    </select>
                    <!-- Custom Arrow Icon -->
                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <NuxtImg src="/images/offer1/arrow-down.png" loading="eager" alt="logo" class="w-5" />

                    </div>
                </div>
                <div class="mx-auto text-center block">
                    <button v-if="!transactionStatus" @click="handlePurchase()"
                        class="purple text-white text-2xl py-3 px-4 lg:w-2/3 mt-7 shadow-lg font-poppins uppercase sm:w-full animate-pulseCustom rounded-md">{{
                            pageData.submitBtnTitle }}</button>
                    <PurchaseSpinner v-if="transactionStatus" />
                    <div class="text-center mt-8 mb-7">
                        <button @click="mayBeLater" class="text-gray-800 font-medium text-lg cursor-pointer underline">
                            No thanks, I don't want this one time exclusive deal.
                        </button>
                    </div>
                    <div class="text-center mx-auto">
                        <NuxtImg src="/images/cards.png" loading="eager" alt="logo" class="w-40 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
        <UpsellFooter />
    </section>

    <!----Modal-->
    <div v-if="isDownsellModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <!-- Popup Container -->
        <div
            class="bg-white border-4 border-dashed border-orange-500 p-2 md:p-8 w-[100%] max-w-2xl shadow-xl text-center">
            <h2 class="text-sm sm:text-2xl font-bold text-blue-900">
                WAIT! FOR THE NEXT 3 MINUTES, GET 23% OFF ON EXPEDITED PROCESSING!
            </h2>
            <p class="mt-4 text-gray-700 font-medium sm:font-bold ">
                Special discount applied. Click below to get Expedited Processing for only <strong>$9.95!</strong>
            </p>

            <!-- Button -->
            <button v-if="!transactionStatus" @click="handleDownsell()"
                class="purple text-white text-lg py-2 p-2 rounded-md  lg:w-2/3 mt-4 shadow-lg font-poppins sm:w-full animate-pulseCustom ">
                YES! I Want to Expedite My Order!</button>
            <PurchaseSpinner v-if="transactionStatus" />
            <p class="mt-3 text-gray-500 text-sm">
                <a @click="closeupsellModal()" class="underline hover:text-red-600 cursor-pointer text-black">I
                    understand this is
                    a
                    one-time
                    limited offer, but no
                    thanks!</a>
            </p>
        </div>
    </div>
    <Alert message="" :pageTo="pageData.nextStep.yes" :stepCompleted="pageData.stepCompleted.yes" />
</template>
<style scoped>
.content-auto {
    content-visibility: auto;
}

.font-poppins {
    font-family: "Poppins", sans-serif;
}

.purple {
    background: #8f51ac !important;
    border: 1px solid #007bff;
}

section#main {
    background: #f1f4f8;
}

.animate {
    transform: rotate(360deg);
    opacity: 1;
}
</style>