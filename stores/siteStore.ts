import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useSiteStore = defineStore("site", () => {
    const isMobileMenuOpen = ref(false);
    const isSearchOpen = ref(false);
    const searchQuery = ref<string>("");
    const searchResultMsg = ref<string>("");
    const countryData = ref({});
    const countryList = ref([]);
    const selectedCountryCode = ref( storage.getSessionItem("selectedCountryCode") || "US");
    return {
        countryData,
        countryList,
        selectedCountryCode,
        isMobileMenuOpen,
        isSearchOpen,
        searchQuery,
        searchResultMsg
    }
})