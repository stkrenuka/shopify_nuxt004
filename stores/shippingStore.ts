// stores/shippingStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
import { useCheckoutStore } from "./checkoutStore";
import { useFormStore } from "./formStore";
type shippingMethods = { shipProfileId: string; profileName: string; rules: { shipPrice: string }[] };

export const useShippingStore = defineStore("shipping", () => {
  // CheckoutStore
  const checkoutStore = useCheckoutStore();
  // formStore
  const formStore = useFormStore();
  // cartStore
  const cartStore = useCartStore();
  const { updateCart, updateLoading } = cartStore;

  const countries = ref<object[]>([]);
  const allStates = ref<object[]>([]);
  const shipState = ref<object[]>([]);
  const billState = ref<object[]>([]);
  const allShippingStates = ref<shippingMethods[]>([]);
  const shippingMethods = ref<object[]>([]);
  const shippingAvailable = ref<object[]>([]);
  const freeShipping = ref<object[]>([]); // if vipOptIn or freeShipThreshold is applicable

  // Config
  const config = useRuntimeConfig();


  // Fetch states using useAsyncData
  const { data: states, error } = useAsyncData(
    "All States",
    async () => await $fetch("https://assets.checkoutchamp.com/countries.json")
  );

  const getStatesByCountry = async (countryCode: string) => {
    return allStates.value.filter((state) => state.countryCode === countryCode);
  };

  const updateStateByName = async (name: string) => {
    formStore.formValues.state = shipState.value.filter(state => state.stateName === name)[0].stateCode
  }
  const updateBillStateByName = async (name = "code") => {
    if (name !== "code") formStore.formValues.billingState = billState.value.filter(state => state.stateName === name)[0].stateCode;
    else formStore.formValues.billingState = billState.value.filter(state => state.stateCode === formStore.formValues.billingState)[0].stateCode;
  }

  // Populate states
  if (states.value) {
    allStates.value = states.value; // Ensure states.value is in expected format
  }

  const setCountry = (country: object[]) => {
    countries.value = country;
    formStore.formValues.country = checkoutStore.defaultCountry;
    if (formStore.formValues.sameAddress) formStore.formValues.billingCountry = formStore.formValues.country;
  };

  const updateShipping = async () => {
    if (allShippingStates.value.length > 0) {
      if (!formStore.formValues.shippingMethod) {
        shippingAvailable.value = [];
        cartStore.updateLoading(false, 'shipping');
        return false;
      }
      shippingAvailable.value = allShippingStates.value.filter(method => method.shipProfileId == formStore.formValues.shippingMethod);
      // console.log("shippingAvailable.value", shippingAvailable.value)
      if (+shippingAvailable.value[0]?.freeShipThreshold <= cartStore.subTotal && shippingAvailable.value[0]?.freeShipThreshold != null) {
        checkoutStore.updateShippingThreshold(true);
        cartStore.updateCart(0, 'shipping');
        // console.log('shipping available', shippingAvailable.value)
      } else {
        checkoutStore.updateShippingThreshold(false);
        cartStore.updateCart(+shippingAvailable.value[0]?.rules[0].shipPrice, 'shipping');
      }
      if (checkoutStore.shippingThreshold || checkoutStore.vipOptIn) formStore.formValues.shippingMethod = config.public.freeShipProfileId.toString();
      else if (formStore.formValues.shippingMethod === config.public.freeShipProfileId.toString()) formStore.formValues.shippingMethod = config.public.shipProfileId.toString();
    }
    cartStore.updateLoading(false, 'shipping');
  }

  const handleStateList = async () => {
    updateLoading(true, 'shipping');
    const stateCountryCode = formStore.formValues.country;
    const billCountryCode = formStore.formValues.billingCountry;
    if (!stateCountryCode) return; // Guard against empty country code
    // update shipping method, Not usable right now i guess
    // if (!checkoutStore.vipOptIn && formStore.formValues.shippingMethod !== '13') {
    //   if (stateCountryCode === "US") {
    //     formStore.formValues.shippingMethod = '5'
    //   } else {
    //     formStore.formValues.shippingMethod = '5'
    //   }
    // }
    const filteredStates = await getStatesByCountry(stateCountryCode);
    formStore.formValues.state = ""; // Reset state when filtering
    shipState.value = filteredStates;
    await updateShipping();
  };

  const handleBillStateList = async () => {
    const billCountryCode = formStore.formValues.billingCountry;
    if (!billCountryCode) return; // Guard against empty billing country code
    const filteredStates = await getStatesByCountry(billCountryCode);
    formStore.formValues.billingState = ""; // Reset billing state when filtering
    billState.value = filteredStates;
  };

  const setShippingMethods = (methods: shippingMethods[]) => {
    allShippingStates.value = methods;
    shippingMethods.value = allShippingStates.value.filter(method => +method.shipProfileId !== config.public.freeShipProfileId);
    freeShipping.value = allShippingStates.value.filter(method => +method.shipProfileId === config.public.freeShipProfileId);
  };

  return {
    countries,
    setCountry,
    handleStateList,
    handleBillStateList,
    allStates,
    shipState,
    billState,
    shippingMethods,
    setShippingMethods,
    shippingAvailable,
    updateStateByName,
    updateBillStateByName,
    updateShipping,
    freeShipping
  };
});
