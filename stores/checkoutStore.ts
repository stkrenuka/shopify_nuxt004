import { defineStore } from "pinia";
import { useCartStore } from "./cartStore";
import { useFormStore } from "./formStore";
import { useShippingStore } from "./shippingStore";

export const useCheckoutStore = defineStore("checkout", () => {
  // cartStore
  const cartStore = useCartStore();
  const { addProduct, removeProduct } = cartStore;
  // formStore
  const formStore = useFormStore();
  const { formValues } = formStore;
  // shippingStore
  const shippingStore = useShippingStore();

  // Alert
  const alertVisible = ref(false);
  const alertMsg = ref("");
  // UTM
  const utmParams = ref({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });
  // Progress Steps
  const stepCompleted = ref<Number>(Number(storage.getLocalItem('stepCompleted')) || 0)
  //facebook capi
  const config = useRuntimeConfig();
  const emailOptIn = ref(true);
  const vipOptIn = ref<boolean>(storage.getLocalItem('vipOptIn') || false);
  const tester = ref(false);
  const vipProduct = ref({});
  const requestUri = ref("");
  const ipAddress = ref("");
  const pageType = ref("");
  const sessionId = ref("");
  const affId = ref("");
  const defaultCountry = ref("None");
  const defaultRegion = ref("No");
  const transactionStatus = ref(false);
  const shippingThreshold = ref(false);
  const fbPixelId = ref(config.public.pixel_id);
  const fbaccess_token = ref(config.public.access_token);

  // ConfirmPayPal Loading
  const confirmPayPalLoading = ref(false);
  const updateConfirmPaypalLoading = (status: boolean) => confirmPayPalLoading.value = status;

  // Function to initialize session ID from storage
  const initializeSessionId = () => {
    const storedSessionId = storage.getSessionItem<string>("sessionId");
    if (storedSessionId) {
      sessionId.value = storedSessionId;
    }
  };

  const updateVipOptIn = (onLoad: boolean) => {
    if (!onLoad) vipOptIn.value = !vipOptIn.value;
    if (vipOptIn.value) addVipInCart();
    else removeVipInCart();
  };

  const updateVipProduct = (productObject: object) => {
    vipProduct.value = productObject;
  };

  const addVipInCart = () => {
    cartStore.updateLoading(true, 'shipping');
    cartStore.addProduct(vipProduct.value);
    formStore.formValues.discountCode = 'VIP10';
    calculateDiscount();
    // shippingStore.handleStateList()
    if (vipOptIn) formStore.formValues.shippingMethod = config.public.freeShipProfileId.toString();
    shippingStore.updateShipping();
    storage.setLocalItem('vipOptIn', true);
  };
  const removeVipInCart = () => {
    vipOptIn.value = false;
    cartStore.updateLoading(true, 'shipping');
    cartStore.removeProduct(vipProduct.value.product_id);
    cartStore.removeCoupon('VIP10')
    formStore.formValues.shippingMethod = config.public.shipProfileId.toString();
    shippingStore.updateShipping();
    storage.setLocalItem('vipOptIn', false);
    console.log('removeVaaipInCart', vipOptIn.value);
  }

  const addRequestUri = (url: string) => (requestUri.value = url);
  const addIpAddress = (ip: string) => (ipAddress.value = ip);
  const addPageType = (page: string) => (pageType.value = page);
  const addAffId = (id: string) => (affId.value = id);
  const addSessionId = (id: string) => {
    sessionId.value = id;
    storage.setSessionItem("sessionId", id);
  };

  const addIpInfo = ({ ip, country, postal, region }: { ip: string, country: string, postal: string, region: string }) => {
    addIpAddress(ip);
    storage.setSessionItem('ipAddress', ip);
    defaultCountry.value = country;
    // defaultRegion.value = region; // not using now
    // formValues.postalCode = postal; // not using now
  }

  const updateTester = (status: boolean) => {
    tester.value = status;
  }

  const updateAlert = (status: boolean, msg: string) => {
    alertVisible.value = status;
    alertMsg.value = msg;
  }

  const setUTMparams = (params: any) => {
    utmParams.value.utm_campaign = params.utm_campaign || '';
    utmParams.value.utm_medium = params.utm_medium || '';
    utmParams.value.utm_source = params.utm_source || '';
    utmParams.value.utm_term = params.utm_term || '';
    utmParams.value.utm_content = params.utm_content || '';
  }

  const setTransactionStatus = (status: boolean) => {
    transactionStatus.value = status;
  }

  const updateShippingThreshold = (status: boolean) => {
    shippingThreshold.value = status;
  }

  const setStepCompleted = (step: number) => {
    stepCompleted.value = step;
    storage.setLocalItem('stepCompleted', stepCompleted.value);
  }

  const resetStepCompleted = () => {
    stepCompleted.value = 0;
    storage.setLocalItem('stepCompleted', stepCompleted.value);
  }

  // Initialize session ID when the store is created
  onMounted(() => {
    initializeSessionId();
  });

  return {
    vipOptIn,
    updateVipOptIn,
    updateVipProduct,
    requestUri,
    addRequestUri,
    ipAddress,
    addIpAddress,
    pageType,
    addPageType,
    sessionId,
    addSessionId,
    addIpInfo,
    addAffId,
    affId,
    defaultCountry,
    defaultRegion,
    tester,
    updateTester,
    emailOptIn,
    alertVisible,
    alertMsg,
    updateAlert,
    utmParams,
    setUTMparams,
    transactionStatus,
    setTransactionStatus,
    shippingThreshold,
    updateShippingThreshold,
    fbPixelId,
    fbaccess_token,
    stepCompleted,
    setStepCompleted,
    resetStepCompleted,
    confirmPayPalLoading,
    updateConfirmPaypalLoading,
    removeVipInCart
  };
});
