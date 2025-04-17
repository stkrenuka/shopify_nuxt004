<script setup>
import { ref, watch } from 'vue';
import { useSiteStore,useCartStore } from "~/stores";
const siteStore = useSiteStore();
const cartStore = useCartStore();
// Body scroll control for search popup
// watch(siteStore.isSearchOpen, (newVal) => {
//     document.body.style.overflow = newVal ? 'hidden' : '';
// });
cartStore.checkSessionProductCart();
const cartCount=computed(() => cartStore.cartCount);
const router = useRouter();
async function goToSearch() {
    if (siteStore.searchQuery?.trim()) {
        await router.push(`/search?query=${encodeURIComponent(siteStore.searchQuery)}`);
    }
}
</script>

<template>
    <nav class="bg-white p-4 lg:pt-7 lg:pb-7 relative z-50">
        <div class="container mx-auto flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
            <!-- Hamburger Menu (Mobile) -->
            <button @click="siteStore.isMobileMenuOpen = true" class="lg:hidden text-2xl z-50">
                <ClientOnly>
                    <i class="fas fa-bars text-black"></i>
                </ClientOnly>
            </button>

            <!-- Logo -->
            <NuxtLink to="/" class="text-2xl font-bold lg:w-1/2 w-full flex lg:justify-start justify-center">
                <NuxtImg src="/images/logo.png" quality="50" format="webp" class="w-[12rem] lg:mx-0 sm:mx-auto h-[33px]"
                    alt="BrowCharm Logo" loading="lazy" />
            </NuxtLink>

            <!-- Cart Icon (Mobile) -->
            <NuxtLink to="/cart" class="hover:text-gray-600 font-bold text-sm uppercase lg:hidden z-50">
                <ClientOnly>
                    <i class="fas fa-cart-shopping text-black"></i>
                </ClientOnly>
            </NuxtLink>
            <span class="cart-link__bubble cart-link__bubble--visible1 block lg:hidden "></span>
            <!-- Desktop Navigation -->
            <ul class="hidden lg:flex space-x-9 lg:w-1/2 w-full items-center lg:justify-end justify-center">
                <li>
                    <NuxtLink to="/" class="hover:text-gray-600 font-semibold uppercase">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products/10090278125842" class="hover:text-gray-600 font-semibold uppercase">
                        Shop Now</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/faq" class="hover:text-gray-600 font-semibold uppercase">FAQ</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact-us" class="hover:text-gray-600 font-semibold uppercase">Contact Us
                    </NuxtLink>
                </li>
                <li>
                    <a href="#" @click.prevent="siteStore.isSearchOpen = true"
                        class="hover:text-gray-600 font-semibold uppercase">
                        <ClientOnly><i class="fas fa-search"></i></ClientOnly>
                    </a>
                </li>
                <li class="relative">
                    <NuxtLink to="/cart" class="hover:text-gray-600 font-bold uppercase relative top-1">
                        <ClientOnly><i class="fas fa-cart-shopping"></i></ClientOnly>
                    </NuxtLink>
                    <span class="cart-link__bubble cart-link__bubble--visible lg:block hidden" v-if="cartCount>0"></span>
                </li>

            </ul>
        </div>

        <!-- Search Popup -->
        <div v-if="siteStore.isSearchOpen" @click.self="siteStore.isSearchOpen = false"
            class="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div class="relative flex items-center">
                <form @submit.prevent="goToSearch" class="relative flex items-center" @click.stop>
                    <input type="text" placeholder="Search our store"
                        class="p-[0.85rem] text-xl border-2 border-black rounded-l focus:outline-none italic" autofocus
                        v-model="siteStore.searchQuery" />
                    <button type="submit"
                        class="bg-[#9152ac] p-[1.09rem] border-2 border-[#9152ac] text-white hover:text-[#9152ac] hover:bg-gray-100">
                        <ClientOnly><i class="fas fa-search"></i></ClientOnly>
                    </button>
                </form>
            </div>
            <button @click="siteStore.isSearchOpen = false" class="absolute top-4 right-4 text-2xl">&times;</button>
        </div>
        <!-- Overlay -->
        <div v-if="siteStore.isMobileMenuOpen" @click="siteStore.isMobileMenuOpen = false"
            class="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden">
        </div>

        <!-- Slide-In Mobile Menu -->
        <div :class="[
            'fixed top-0 left-0 h-full w-64 bg-[#1f1f1f] text-white z-50 p-6 space-y-6 transform transition-transform duration-300 ease-in-out lg:hidden',
            siteStore.isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
            <!-- Close Button -->
            <button @click="siteStore.isMobileMenuOpen = false" class="text-white text-2xl absolute top-4 right-4">
                &times;
            </button>

            <!-- Mobile Nav Links -->
            <nav class="mt-10 space-y-6">
                <NuxtLink to="/" class="block text-lg font-medium">Home</NuxtLink>
                <NuxtLink to="/products/10098841485586" class="block text-lg font-medium">Shop Now</NuxtLink>
                <NuxtLink to="/faq" class="block text-lg font-medium">FAQ</NuxtLink>
                <NuxtLink to="/contact-us" class="block text-lg font-medium">Contact Us</NuxtLink>
            </nav>
        </div>
    </nav>
</template>
<style scoped>
button.text-white.text-2xl.absolute.top-4.right-4 {
    font-size: 3rem !important;
    font-weight: 300 !important;
}

i.text-black {
    font-size: 1.6rem !important;

}

a.block.text-lg.font-medium {
    font-size: 1.6rem !important;
    font-weight: 300;
}
a {
    font-size: .815em !important;
}
.cart-link__bubble--visible {
    display: block;
    position: relative;
    top: -21px;
    right: -10px;
    width: 10px;
    height: 10px;
    background-color: #8f51ac;
    border-radius: 50%;
}
.cart-link__bubble--visible1{
    display:none;
}
@media (max-width:650px){
    .cart-link__bubble--visible {
        display:none;
    }
    .cart-link__bubble--visible1 {
    display: block;
    position: relative;
    top: -14px;
    right: 5px;
    width: 12px;
    height: 12px;
    background-color: #8f51ac;
    border-radius: 50%;
    z-index: 999;
}
}
</style>