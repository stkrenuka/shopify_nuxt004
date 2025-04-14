import { number } from "card-validator";
import CryptoJS from "crypto-js";
import { useCartStore, useShippingStore } from "~/stores";
import { useCheckoutStore } from "~/stores/checkoutStore";
import { useFormStore } from "~/stores/formStore";
export const campaignQuery = async (params: any) => {
  const campaingID = useRuntimeConfig().public.CC_CAMPAIGN_ID;
  const [ids, campaignProductId] = campaignProductIds();

  const response:any = await apiHandler('getCampaign', { campaignProductId: campaignProductId.join(",") })
  if (response.result === "SUCCESS") {
    const { products, countries, shipProfiles } = response.message.data[campaingID];
    const cartDetails = cartData(ids, products);
    const vipProductData = updateVipData(products);
    return { cartDetails, countries, shipProfiles, vipProductData };
  } else {
    return response;
  }
};
export const confirmPayPalLoading = (status: boolean) => {
  storage.setSessionItem('confirmPaypalLoading', status);
}
export const cartData = (ids:any, products:any) => {
  const data: object[] = [];
  ids.map((id:any) => {
    products.map((product:any) => {
      if (product.campaignProductId == id.productId) {
        let variants = [];
        if (id.variantId) {
          variants = product.variants.filter(
            (v:any) => v.variantDetailId == id.variantId
          );
        }
        data.push({
          product_id: product.campaignProductId,
          title: product.productName,
          variant_id: variants[0] ? variants[0].variantDetailId : "",
          price: variants[0]
            ? Number(variants[0].price) * Number(id.quantity)
            : Number(product.price) * Number(id.quantity),
          image: variants[0] ? variants[0].imageUrl : product.imageUrl,
          variant_title: variants[0] ? variants[0].title : "",
          product_qty: id.quantity,
        });
      }
    });
  });
  return data;
};
const campaignProductIds = () => {
  const cartStore = useCartStore();
  const config = useRuntimeConfig().public;
  const ids: { productId: string; quantity: string; variantId: string }[] = [];
  cartStore.productCart.forEach((item) => {
    const [quantity,productId, variantId = ""] =[item.product_qty,item.product_id,item.variant_id];
    ids.push({ productId, quantity, variantId });
  });


  const campaignProductId = ids.map((item) => item.productId);
  campaignProductId.push(config.vipProduct.toString())
  return [ids, campaignProductId];
};
export const decryptedResult = (encryptedResult: string) => {
  const secretKey = useRuntimeConfig().public.SecretKey; // Ensure this matches the key used for encryption
  // Decrypt the result
  const bytes = CryptoJS.AES.decrypt(encryptedResult, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
const updateVipData = (products: Product[]) => {
  const vipId = useRuntimeConfig().public.vipProduct;
  const vipProduct = products.filter(
    (product) => product.campaignProductId == vipId
  )[0];
  return {
    product_id: vipProduct.campaignProductId,
    title: vipProduct.productName,
    variant_id: "",
    price: Number(vipProduct.price),
    image: vipProduct.imageUrl,
    variant_title: "",
    product_qty: 1,
    shopify_product_id:0,
    shopify_variant_id:0

  };
};

export const formParams = async (type = "lead") => {
  const config = useRuntimeConfig().public;
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { requestUri, ipAddress, pageType, sessionId, affId, emailOptIn, utmParams } =
    checkoutStore;
  // formStore
  const formStore = useFormStore();
  const { formValues } = formStore;
  // cartStore
  const cartStore = useCartStore();
  const { productCart } = cartStore;
  // orderId
  const orderId = storage.getSessionItem("orderId") ? storage.getSessionItem("orderId") : "";
  // couponCode
  const value = cartStore.couponSuccess;
  const couponCode = value.length === 2 ? value[0].code + ',' + value[1].code : value.length === 1 ? value[0].code : "";
  // params
  const storedParams: any = storage.getSessionItem('urlParameterString') || '{}';
  // Lead Details
  const params: any = {
    pageType,
    requestUri,
    ipAddress,
    sessionId,
    affId,
    orderId,
    emailOptIn,
    couponCode,
    salesUrl: await getRequestUri(),
    shipProfileId: formValues.shippingMethod,
    shipAddress1: formValues.address1,
    shipAddress2: formValues.address2,
    shipCity: formValues.city,
    shipCountry: formValues.country,
    shipPostalCode: formValues.postalCode,
    shipState: formValues.state,
    shipFirstName: formValues.firstName,
    shipLastName: formValues.lastName,
    address1: formValues.billingAddress1,
    address2: formValues.billingAddress2,
    billShipSame: formValues.sameAddress,
    city: formValues.billingCity,
    country: formValues.billingCountry,
    firstName: formValues.billingFirstName,
    lastName: formValues.billingLastName,
    emailAddress: formValues.email,
    phoneNumber: formValues.phone.replace(/[^\d]/g, ''),
    postalCode: formValues.billingPostalCode,
    state: formValues.billingState,
    paySource: formValues.paymentMethod,
    custom1: "BrowCharm RevBoost",
    custom2: "CheckoutV3",
    custom5: "APIviii-ta",
    redirectsTo: `${window.location.origin}/offer1`,
    errorRedirectsTo: `${window.location.origin}?${new URLSearchParams(storedParams).toString()}`,
  }
  productCart.map((el, index) => {
    const pid = "product" + (index + 1) + "_id";
    const pqty = "product" + (index + 1) + "_qty";
    const vid = "variant" + (index + 1) + "_id";
    const prz = "product" + (index + 1) + "_price";
    params[pid] = el.product_id;
    params[pqty] = el.product_qty;
    params[vid] = el.variant_id;
    params[prz] = el.price;
  });
  if (type === "order") {
    if (formValues.paymentMethod !== "PAYPAL") {
      params.cardNumber = formValues.cardNumber;
      params.cardMonth = formValues.expiryMonth;
      params.cardYear = formValues.expiryYear;
      params.cardSecurityCode = formValues.cvv;
      // UTM
      // Object.entries(utmParams).forEach(([key, value]) => {
      //   // params[`custom_order_${key}`] = value;
      //   console.log("add hua", type)
      //   // if (value) { // Ensure value is not empty or undefined
      //   // }
      // });
    } else {
      params.paySource = 'PAYPAL';
      // params.forceMerchantId = 13;
      params.paypalBillerId = config.paypalBillerId;
    }
  };
  params.browserData = await getBrowserData();
  return params;
}
export const partialOrderFormParams = async (type = "lead") => {
  // cartStore
  const cartStore = useCartStore();
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { ipAddress, pageType, sessionId, affId } =
    checkoutStore;
  // formStore
  const formStore = useFormStore();
  const { formValues } = formStore;
  if (!formValues.lastName || !formValues.firstName) return false
  // couponCode
  const value = cartStore.couponSuccess;
  const couponCode = value.length === 2 ? value[0].code + ',' + value[1].code : value.length === 1 ? value[0].code : "";
  const partialOrderParams: any = {
    pageType,
    ipAddress,
    sessionId,
    affId,
    couponCode,
    salesUrl: await getRequestUri(),
    shipAddress1: formValues.address1,
    shipAddress2: formValues.address2,
    shipCity: formValues.city,
    shipState: formValues.state,
    shipFirstName: formValues.firstName,
    shipLastName: formValues.lastName,
    country: formValues.billingCountry,
    firstName: formValues.billingFirstName,
    lastName: formValues.billingLastName,
    emailAddress: formValues.email,
    phoneNumber: formValues.phone.replace(/[^\d]/g, ''),
    postalCode: formValues.billingPostalCode,
  }
  return partialOrderParams;
}
export const getRequestUri = async () => {
  return window.location.href;
};
export const fetchIpInfo = async () => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // await fetch("https://ipinfo.io/json", requestOptions)
    const response = await fetch("https://ipinfo.io/json", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    // throw new Error;
    console.error("Error fetching IP address:", error);
    return error;
  }
};
export const importClick = async () => {
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { requestUri, ipAddress, pageType, sessionId, addSessionId, affId } =
    checkoutStore;
  const params = { requestUri, ipAddress, pageType, sessionId, affId };
  const response:any = await apiHandler('importClick', params);
  addSessionId(response.message.sessionId); // add the sessionId to the session
};
export const calculateDiscount = async () => {
  // cartStore
  const cartStore = useCartStore();
  const { productCart, applyDiscount, updateLoading, updateCouponSuccess, updateCouponError } = cartStore;
  // formStore
  const formStore = useFormStore();
  if (!formStore.formValues.discountCode) return;
  updateLoading(true, 'discount');
  // Discount Coupon
  const params: any = { couponCode: formStore.formValues.discountCode }
  //products
  productCart.map((el, index) => {
    const pid = "product" + (index + 1) + "_id";
    const pqty = "product" + (index + 1) + "_qty";
    const vid = "variant" + (index + 1) + "_id";
    params[pid] = el.product_id;
    params[pqty] = el.product_qty;
    params[vid] = el.variant_id;
  });
  try {
    const response: any = await apiHandler('getDiscount', params)
    // console.log(response.result);
    if (response.result === "SUCCESS") {
      if (response.message.priceDiscount > 0) {
        updateCouponSuccess(formStore.formValues.discountCode, "Coupon Code has been applied", response.message.priceDiscount);
      } else {
        updateCouponError(formStore.formValues.discountCode, "Please Enter a Valid Coupon Code");
      }
      // applyDiscount(response.message.priceDiscount);
    } else if (response.result === "ERROR") {
      updateCouponError(formStore.formValues.discountCode, response.message)
    }
  } catch (error) {
    updateLoading(false, 'discount');
  } finally {
    formStore.formValues.discountCode = "";
    updateLoading(false, 'discount');
  }
};
export async function getBrowserData() {
  const data = {
    acceptHeader: 'application/json',
    userAgent: navigator.userAgent,
    language: navigator.language || navigator.userLanguage,
    timezone: String(new Date().getTimezoneOffset() * -1 * 60), // Timezone in minutes as a string
    colorDepth: window.screen.colorDepth,
    screen: {
      height: String(window.screen.height), // Convert to string
      width: String(window.screen.width), // Convert to string
    },
    javaScriptEnabled: true, // Always true when running in the browser
    javaEnabled: false, // Typically false; use `navigator.javaEnabled()` if needed
  };
  return JSON.stringify(data);
}

export const extractAddressComponents = async (addressComponents: AddressComponent[], type = 'ship') => {
  const formStore = useFormStore();
  const handleError = formStore.handleError;
  const shippingStore = useShippingStore();
  let streetNumber = '';
  let route = '';
  let locality = '';
  let stateCode = '';
  let countryCode = '';
  let postalCode = '';
  addressComponents.forEach(component => {
    const types = component.types;
    // Combine premise, route, and sublocality levels into streetNumber
    if (types.includes('premise') || types.includes('street_number') ||
      types.includes('sublocality_level_3') || types.includes('sublocality_level_2') ||
      types.includes('sublocality_level_1') || types.includes('route')) {
      if (streetNumber) {
        streetNumber += ', ';
      }
      streetNumber += component.long_name;
    } else if (types.includes('locality')) {
      locality = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      stateCode = component.short_name; // State
    } else if (types.includes('country')) {
      countryCode = component.short_name;
    } else if (types.includes('postal_code')) {
      postalCode = component.long_name; // Main postal code
    }
  });
  // Log the extracted values
  if (type === 'ship') {
    formStore.formValues.address1 = streetNumber;
    handleError('address1');
    formStore.formValues.city = locality;
    handleError('city');
    formStore.formValues.country = countryCode;
    handleError('country');
    await shippingStore.handleStateList();
    formStore.formValues.state = stateCode;
    handleError('state');
    formStore.formValues.postalCode = postalCode;
    handleError('postalCode');
  }
  if (formStore.formValues.sameAddress || type !== 'ship') {
    formStore.formValues.billingAddress1 = streetNumber + " " + route;
    handleError('billingAddress1');
    formStore.formValues.billingCity = locality;
    handleError('billingCity');
    formStore.formValues.billingCountry = countryCode;
    handleError('billingCountry');
    await shippingStore.handleBillStateList();
    formStore.formValues.billingState = stateCode;
    handleError('billingState');
    formStore.formValues.billingPostalCode = postalCode;
    handleError('billingPostalCode');
  }
  await getOrderSalesTax();
};
export const SHA256 = (data: any) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}
/*  ------------------------------------Regarding FBC ID------------------------------------------------- */
//  Helper function to generate a consistent hash code for a string
export function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
// Function to get the subdomain index
export function getSubdomainIndex() {
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[0];
  return Math.abs(hashCode(subdomain));
}
// Function to get the creation time (first page view timestamp)
export function getCreationTime() {
  const creationTimeKey = "creation_time";
  let creationTime: any = localStorage.getItem(creationTimeKey);
  if (!creationTime) {
    creationTime = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    localStorage.setItem(creationTimeKey, creationTime);
  }
  return creationTime;
}
// Function to get the fbclid from URL parameters
export function getFbclid() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("fbclid");
}
// Function to create the fbc ID
export function createFBCID() {
  const subdomainIndex = getSubdomainIndex();
  const creationTime = getCreationTime();
  const fbclid = getFbclid();
  if (fbclid) {
    return `fb.${subdomainIndex}.${creationTime}.${fbclid}`;
  }
  return "Click ID is not present in the URL parameters";
}
export const getOrderDetails = () => {
  const ipAddress = storage.getSessionItem('ipAddress');
  const cartTotal = storage.getSessionItem('cartTotal');
  const productCart = storage.getSessionItem('productCart');
  const orderId = storage.getSessionItem('orderId');
  const firstName = storage.getSessionItem('firstName');
  const lastName = storage.getSessionItem('lastName');
  const emailAddress = storage.getSessionItem('emailAddress');
  const phoneNumber = storage.getSessionItem('phoneNumber');
  const city = storage.getSessionItem('city');
  const state = storage.getSessionItem('state');
  const postalCode = storage.getSessionItem('postalCode');
  const country = storage.getSessionItem('country');
  const subTotal = storage.getSessionItem('subTotal');
  const shipping = storage.getSessionItem('shipping');
  const tax = storage.getSessionItem('tax');
  return { subTotal, shipping, tax, ipAddress, productCart, cartTotal, orderId, firstName, lastName, emailAddress, phoneNumber, city, state, postalCode, country }
}
// fbc and fbp
export function getCookie(name: any) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
// Declared interface for ts error resolve
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export async function dataLayer(eventType: string) {
  const { productCart, cartTotal, orderId, firstName, lastName, emailAddress, phoneNumber, subTotal, shipping, tax } = await getOrderDetails();
  if (!productCart) return

  const datalayerobj = {
    event: eventType,
    currency: "USD",
    subTotal,
    shipping,
    tax,
    total: cartTotal,
    items: productCart,
    ...eventType !== "Checkout" && eventType !== "AddToCart" && {
      customerfname: firstName,
      customerlname: lastName,
      customeremail: emailAddress,
      customerphone: phoneNumber,
      orderid: orderId
    }
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(datalayerobj);

}

export function handleFocus() {
  dataLayer('AddToCart');
}
// export const addStoredParamsToUrl = () => {
//   const router = useRouter();
//   const route = useRoute();
//   const storedParams = sessionStorage.getItem('urlParameterString') || '{}';
//   const currentParams = { ...route.query, ...storedParams }; // Combine
//   router.replace({ query: currentParams }); // Update URL without reloading
// };
export function getUpsellproId(id: string | string[]) {
  const config = useRuntimeConfig();
  const key = Array.isArray(id) ? id[0] : id;
  const productId = config.public[key];
  return productId;
}

// Destruct Items for DataLayer and CAPI:
export const mapToProductCart = (items: mapToProductCartI[]) => (
  items.map((obj) => ({
    product_id: obj.productId,
    title: obj.name,
    price: obj.price,
    product_qty: obj.qty,
    variant_id: obj.variantDetailId,
    variant_title: obj.title
  }))
)
