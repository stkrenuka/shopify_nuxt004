<template>
    <div v-if="loading" id="id">
        <!-- Background Overlay Div -->
        <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <!-- Alert Box -->
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-2/3 flex p-4 mb-4 rounded-lg z-50 justify-center items-center">
            <NuxtImg src="/images/Ripple.svg" alt="confirmPaypal" class="max-w-full max-h-full" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useCheckoutStore } from '~/stores';

const checkoutStore = useCheckoutStore();
const loading = computed(() => checkoutStore.confirmPayPalLoading)
</script>