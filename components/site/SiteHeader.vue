<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);
// Body scroll control
watch(isSearchOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
        document.body.style.overflow = ''; // Enable scroll
    }
});
</script>

<template>
    <!-- <script async type='text/javascript'
        src='https://static.klaviyo.com/onsite/js/UsRnHL/klaviyo.js?company_id=UsRnHL'></script> -->
    <nav class="bg-white p-4 lg:pt-7 lg:pb-7">
        <div class="container mx-auto flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
            <!-- Hamburger Menu (Mobile) -->
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden text-2xl">
                <ClientOnly>
                    <i class="fas fa-bars"></i>
                </ClientOnly>
            </button>

            <!-- Logo -->
            <NuxtLink to="/" class="text-2xl font-bold lg:w-1/2 w-full flex lg:justify-start justify-center">
                <NuxtImg src="/images/logo.png" quality="50" format="webp" class="w-[13rem]" alt="BrowCharm Logo"
                    loading="lazy" />
            </NuxtLink>

            <!-- Cart Icon (Mobile) -->
            <NuxtLink to="/cart" class="hover:text-gray-600 font-bold text-sm uppercase lg:hidden">
                <ClientOnly>
                    <i class="fas fa-cart-shopping"></i>
                </ClientOnly>
            </NuxtLink>

            <!-- Navigation Links (Desktop) -->
            <ul class="hidden lg:flex space-x-9 lg:w-1/2 w-full items-center lg:justify-end justify-center">
                <li>
                    <NuxtLink to="/" class="hover:text-gray-600 font-semibold text-sm uppercase">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products/10098841485586" class="hover:text-gray-600 font-semibold text-sm uppercase">
                        Shop Now
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/faq" class="hover:text-gray-600 font-semibold text-sm uppercase">FAQ</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact-us" class="hover:text-gray-600 font-semibold text-sm uppercase">Contact Us
                    </NuxtLink>
                </li>
                <li @click="isSearchOpen = true">
                    <a id="openSearch" class="hover:text-gray-600 font-semibold text-sm uppercase">
                        <ClientOnly><i class="fas fa-search"></i></ClientOnly>
                    </a>
                </li>
                <li>
                    <NuxtLink to="/cart" class="hover:text-gray-600 font-bold text-sm uppercase">
                        <ClientOnly><i class="fas fa-cart-shopping"></i></ClientOnly>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Search Popup -->
        <div v-if="isSearchOpen" class="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div class="relative flex items-center">
                <input type="text" placeholder="Search our store"
                    class="p-[0.85rem] text-xl border-2 border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#9152ac]"
                    autofocus>
                <button
                    class="bg-[#9152ac] p-4 rounded-r-lg border-2 border-[#9152ac] text-white hover:text-[#9152ac] hover:bg-gray-100">
                    <ClientOnly>
                        <i class="fas fa-search"></i>
                    </ClientOnly>
                </button>
            </div>
            <button @click="isSearchOpen = false" class="absolute top-4 right-4 text-2xl">&times;</button>
        </div>

        <!-- Mobile Menu (Visible when isMobileMenuOpen is true) -->
        <ul v-show="isMobileMenuOpen" class="lg:hidden flex flex-col space-y-4 mt-4">
            <li>
                <NuxtLink to="/" class="hover:text-gray-600 font-semibold text-sm uppercase">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/products/rty" class="hover:text-gray-600 font-semibold text-sm uppercase">Shop Now
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/faq" class="hover:text-gray-600 font-semibold text-sm uppercase">FAQ</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/contact-us" class="hover:text-gray-600 font-semibold text-sm uppercase">Contact Us
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>