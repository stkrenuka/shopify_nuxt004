import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useSiteStore = defineStore("site", () => {
    const isMobileMenuOpen = ref(false);
    const isSearchOpen = ref(false);
    const searchQuery = ref<string>("");
    const searchResultMsg = ref<string>("");
    return{
        isMobileMenuOpen,
        isSearchOpen,
        searchQuery,
        searchResultMsg
    }
})