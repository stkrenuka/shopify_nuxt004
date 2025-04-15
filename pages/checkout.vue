  <template>
    <section id="main">
      <div class="container-fluid mx-auto  lg:w-full bg-white">
        <CheckoutHeader />
        <FormComponent />
      </div>
    </section>

    <Alert message="" />
    <ConfirmPaypalLoading />
  </template>
<script lang="ts" setup>
import Alert from "~/components/Alert.vue";
import { CheckoutHeader } from "~/components/export";
import { useCartStore, useCheckoutStore, useFormStore, useShippingStore } from "~/stores";

definePageMeta({
  middleware: 'save-params'
});
const route = useRoute();
// Checkout Store
const checkoutStore = useCheckoutStore();
const ba_token = route.query.ba_token;
const payerID = route.query.PayerID;
if (payerID || ba_token) checkoutStore.updateConfirmPaypalLoading(true);
const productsParams = route.query.products;
const affId = route.query.affId;
const tester = route.query.cctester;

// Cart Store
const cartStore = useCartStore();
const { addProduct, loadCart } = cartStore;
const checksessionProduct=cartStore.checkSessionProductCart();


// Shipping Store
const shippingStore = useShippingStore();
const { setCountry, setShippingMethods } = shippingStore;

const { updateVipProduct, addRequestUri, addPageType, addIpInfo, addAffId, setUTMparams } = checkoutStore;
addPageType("checkoutPage");
if (tester) checkoutStore.updateTester(true);
// setUTMparams(route.query);

// formStore
const formStore = useFormStore();
// Fetch the results asynchronously
function fetchCampaignResults() {

    loadCart("true");
    requestIdleCallback(async () => {
      try {
        const { cartDetails, countries, shipProfiles, vipProductData } =
          await campaignQuery();
        // debugger;
        const info = await fetchIpInfo(); // get ip address
        if (info) addIpInfo(info);
        // if (cartDetails) cartDetails.forEach((product) => addProduct(product));
        // else addProduct(emptyCart);
        if (vipProductData) updateVipProduct(vipProductData);
        if (countries) setCountry(countries);
        if (shipProfiles) await setShippingMethods(shipProfiles);
        addAffId(affId as string);
        setTimeout(() => {
          formStore.billSame();
        }, 1000);
        await getRequestUri().then(url => addRequestUri(url)); // add requestUri in store
        importClick();
      } catch (error) {
        console.error("Error fetching campaign results:", error);
      } finally {
        loadCart("false");
        fbCAPI("Checkout");
        setTimeout(() => {
          dataLayer("Checkout");
        }, 1000); // To prevent the dataLayer from being called before the page is fully loaded and all required values are available
        if (checkoutStore.vipOptIn) {
          checkoutStore.updateVipOptIn(true);
        }
      }
    });
  }




onMounted(async () => {
  // Disable the write click
  document.addEventListener("contextmenu", (event: any) => event.preventDefault());
  document.addEventListener('copy', (e) => {
    e.preventDefault(); // Prevent default copy action

    // Custom message to replace copied text
    const message = "Copying is not allowed. All rights reserved ©";

    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", message);
    }

    // alert("Copying is restricted!"); // Show a warning to the user
  });

  checkSteps();
  await confirmPaypal(); // This is updated below
  // Call the function
  fetchCampaignResults(); // moved here so that products can also load after coming back from PayPal
});
</script>
