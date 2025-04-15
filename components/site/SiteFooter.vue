<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSiteStore } from "~/stores";
const siteStore = useSiteStore();
// Reactive references
const countryList = ref([]);
// Fetch country list (from your API)
async function fetchCampaignCountries() {
    const { countries } = await campaignQuery();
    countryList.value = countries;
}

onMounted(async () => {
    await fetchCampaignCountries();
    const res = await fetch('/exchangeRate.json');
    const exchangeRates = await res.json();

    // Map country code to currency data + exchange rate
    const mapped = {};
    for (const country of countryList.value) {
        const code = country.countryCode;
        const rate = exchangeRates[country.currencyCode];

        if (rate) {
            mapped[code] = {
                currencyCode: country.currencyCode,
                locale: country.locale || `en-${code}`, // fallback locale
                exchangeRate: rate,
            };
        }
    }
    siteStore.countryData = mapped;
    watch(
        () => siteStore.selectedCountryCode,
        (newValue) => {
            storage.setSessionItem("selectedCountryCode", newValue);
        },
    );
});
</script>
<template>
    <section
        class="container w-5/6 w-full mx-auto lg:flex justify-between items-start px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4 lg:py-10">
        <!-- Footer -->
        <div class="lg:w-1/3 w-full sm:text-center lg:text-left flex flex-col items-center lg:items-start gap-2">
            <NuxtLink to="/products/10098841485586">Shop now</NuxtLink>
            <NuxtLink to="/faq">FAQ</NuxtLink>
            <NuxtLink to="/contact-us">Contact Us</NuxtLink>
        </div>
        <div class="lg:w-1/3 w-full pb-10 sm:text-center lg:text-left flex flex-col items-center lg:items-start gap-2">
            <a href="https://policy.browcharm.co/browcharm/policies/privacy.html" target="_blank">Privacy Policy</a>
            <a href="https://policy.browcharm.co/browcharm/policies/terms.html" target="_blank">Terms of Service</a>
            <a href="https://browcharm.co/pages/subscription-cancellation-request" target="_blank">Cancel
                Subscription</a>
            <NuxtImg src="/images/ssl-encryption-logo.png" loading="lazy" class="w-40" />
        </div>
        <div class="lg:w-1/3 w-full text-right">
            <select id="country" v-model="siteStore.selectedCountryCode"
                class="mb-3 p-2 bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 italic">
                <option v-for="country in countryList" :key="country.code" :value="country.countryCode">
                    {{ country.countryName }} ({{ country.currencyCode }})
                </option>
            </select>

            <p class="text-right">© 2025, Brow Charm<br>
                Powered by Shopify</p>
            <div class="flex flex-wrap items-center justify-end my-4  gap-2">
                <NuxtImg src="/images/amrican.avif" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/dc.png" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/discover.png" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/gpay.png" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/mastercard.png" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/paypal.png" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/shoppay.webp" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/venmo.avif" class="h-7 p-1 border" loading="lazy" />
                <NuxtImg src="/images/visa.png" class="h-7 p-1 border" loading="lazy" />
            </div>
        </div>
    </section>
</template>