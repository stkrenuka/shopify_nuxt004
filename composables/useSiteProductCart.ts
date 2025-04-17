import { ref, computed, watch } from "vue";
import { useCartStore,useCheckoutStore,useSiteStore } from "~/stores";
export const useSiteProductCart = (productId: string) => {
  const product = ref<any>({});
  const variants = ref<any[]>([]);
  const selectedQuantity = ref<number>(1);
  const image = ref<string>("/images/placeholder.png");
  const images = ref<{ src: string }[]>([]);
  const selectedOptions = ref<{ [key: string]: string }>({});
  const cartStore = useCartStore();
  const compareAtPrice= ref<number>(0);
  const price= ref<number>(0);

  const { addProduct } = cartStore;
  const getproduct = async () => {
    try {
      const response = await siteApiHandler("getProduct", productId);
      if (!response || !response.length) return;
      product.value = response[0];
      if (product.value.image) image.value = product.value.image.src;
      if (product.value.images?.length > 0) images.value = product.value.images;
      variants.value = product.value.variants || [];
      (product.value.options as ProductOption[]).forEach((option: ProductOption) => {
        const values = getValues(option.values);
        if (values.length > 0) {
          selectedOptions.value[option.name] = values[0];
        }
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const selectedVariant = computed(() => {
    return variants.value.find((variant) =>
      Object.keys(selectedOptions.value).every((optionName, index) =>
        variant[`option${index + 1}`] === selectedOptions.value[optionName]
      )
    );
  });
  const selectedVariantPrice = computed(() => {
    price.value = selectedVariant.value?.price || 0;
    return price.value;
  });
  const selectedVariantCompareAtPrice = computed(() => {
    compareAtPrice.value = selectedVariant.value?.compare_at_price || 0;
    return compareAtPrice.value;


  });
  const addToCart = async () => {
    const cartDetails = await siteCartData(selectedVariant.value, selectedQuantity.value, product.value.title, product.value.image?.src ?? image.value);
    if (cartDetails) addProduct(cartDetails);
  };
  const getValues = (values: { value: string }[]): string[] => {
    return values.length > 0 ? values[0].value.split(',').map(v => v.trim()) : [];
  };
  const selectOption = (optionName: string, value: string) => {
    selectedOptions.value[optionName] = value;
  };
  const isSelected = (optionName: string, value: string) => {
    return selectedOptions.value[optionName] === value;
  };
  const selectImage = (imgSrc: string) => {
    image.value = imgSrc;
  };
 const  getSelectedValue=(optionName:any) =>{
  console.log('sdsdsdSD',optionName)
   // selectedOptions.value[optionName] || '';
  }
  watch(selectedVariant, (newVariant) => {
    if (newVariant?.variant_image?.src) {
      image.value = newVariant.variant_image.src;
    }
  });
  return {
    product,
    variants,
    selectedQuantity,
    image,
    images,
    selectedOptions,
    selectedVariant,
    getproduct,
    addToCart,
    selectOption,
    isSelected,
    selectImage,
    getValues,
    getSelectedValue,
    selectedVariantPrice,
    selectedVariantCompareAtPrice
  };
};
export const siteCartData = (product: object, qty: number, productTitle: string, productImg: string) => {
  return {
    shopify_product_id: (product as any).product_id,
    title: productTitle,
    shopify_variant_id: (product as any).shopify_variant_id || "",
    price: parseFloat((product as any).price),
    image: (product as any).variant_image?.src || productImg,
    variant_title: (product as any).title,
    product_qty: qty,
    product_id: "",
    variant_id: "",
    uniqueKey:Math.floor(1000 + Math.random() * 9000)
  };
};
export const removeSiteProduct = (productId: number, uniqueKey: number) => {
  const cartStore = useCartStore();
  const checkoutStore = useCheckoutStore();
  cartStore.cartLoading = false;
  console.log("Product removed from cart:", cartStore.cartLoading);
  if(productId == 0)
    {
      checkoutStore.removeVipInCart();
    }

  cartStore.productCart = cartStore.productCart.filter(
    (product) => !(product.uniqueKey === uniqueKey)
  );
  cartStore.cartCount = cartStore.productCart.length;
  storage.setSessionItem('productCart', cartStore.productCart);
  cartStore.updateSubTotal();
};
export const getCCProductId = async () => {
  const cartStore = useCartStore();
  if (!cartStore.productCart.length) return;
  // Create an array of promises
  const updatePromises = cartStore.productCart.map(async (item, index) => {
    if (item.product_id === "") {
      const response: any = await apiHandler('getCCProduct', { variant_id: item.shopify_variant_id });
      if (response.metafields) {
        const [productIdStr, variantIdStr] = response.metafields[0].value.split('.');
        cartStore.productCart[index].product_id = productIdStr;
        cartStore.productCart[index].variant_id = variantIdStr ?? "";
      } else {
        console.log(`No metafields for index ${index}`);
      }
    }
  });
  // Wait for all async updates to complete
  await Promise.all(updatePromises);
  // Store updated cart
  storage.setSessionItem('productCart', cartStore.productCart);
};
export const getSearchProducts=async()=>{
  const siteStore = useSiteStore();
  try
  {
    const response: any = await siteApiHandler('getSearchProducts', siteStore.searchQuery);
    if(!response || !response.length) {
      siteStore.searchResultMsg = `Your search for "${siteStore.searchQuery}" did not yield any results.`;
      return;
    }
    else{
      siteStore.searchResultMsg = `Your search for "${siteStore.searchQuery}" revealed the following:`;
      return await response;
    }
  }
  catch (error) {
    console.error("Error fetching search products:", error);
  }

}

export function formatCurrency(amount:string, currency:string, locale:string) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
  }).format(amount);
}
export function getLocalizedItemTotal(price: number, quantity: number) {
  const siteStore = useSiteStore();
  const data = siteStore.countryData[siteStore.selectedCountryCode];
  const total = price * quantity;
  if (!data) return `$${total.toFixed(2)}`;
  const converted = total * data.exchangeRate;
  return formatCurrency(converted, data.currencyCode, data.locale);
}
export function formatedPrices(amount:any) {
  const siteStore = useSiteStore();
  const data = siteStore.countryData[siteStore.selectedCountryCode];
  const basePrice = amount?amount:0.00;
  if (!data) return `${(+basePrice).toFixed(2)}`;
  const convertedAmount = basePrice * data.exchangeRate;
  return formatCurrency(convertedAmount, data.currencyCode, data.locale);
}
export async function getLocalizedonCheckout(countryList:[]){
  const siteStore = useSiteStore();

  const res = await fetch('/exchangeRate.json');
  const exchangeRates = await res.json();
  const mapped = {};
  for (const country of countryList) {
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
}
export async function getPageContent(pageId: number) {
  try {
    const response: any = await apiHandler('faqContent',  { page_id: pageId });
    if (!response || !response.page) return;
    const page = response.page;
    const content = page.body_html;
    return content;
  } catch (error) {
    console.error("Error fetching FAQ content:", error);
  }
}
