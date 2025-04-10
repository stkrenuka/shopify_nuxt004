import { ref, computed, watch } from "vue";
import { useCartStore } from "~/stores";
export const useSiteProductCart = (productId: string) => {
  const product = ref<any>({});
  const variants = ref<any[]>([]);
  const selectedQuantity = ref<number>(1);
  const image = ref<string>("");
  const images = ref<{ src: string }[]>([]);
  const selectedOptions = ref<{ [key: string]: string }>({});
  const cartStore = useCartStore();
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
        console.log('zfgjk', option.values)
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
  const addToCart = async () => {
    const cartDetails = await siteCartData(selectedVariant.value, selectedQuantity.value, product.value.title, product.value.image.src);
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
  };
};
export const siteCartData = (product: object, qty: number, productTitle: string, productImg: string) => {
  return {
    shopify_product_id: (product as any).product_id,
    title: productTitle,
    shopify_variant_id: (product as any).shopify_variant_id || "",
    price: parseInt((product as any).price),
    image: (product as any).variant_image?.src || productImg,
    variant_title: (product as any).title,
    product_qty: qty,
    product_id: "",
    variant_id: ""
  };
};
export const removeSiteProduct = (productId: number, variantId: number) => {
  console.log('productId',productId,'variantId',variantId)

  const cartStore = useCartStore();
  cartStore.cartLoading = false;
  cartStore.productCart = cartStore.productCart.filter(
    (product) => !(product.shopify_product_id === productId && product.shopify_variant_id === variantId)
  );
  console.log('dDdD',cartStore.productCart)

  storage.setSessionItem('productCart', cartStore.productCart);
  cartStore.updateSubTotal();
};
export const getCCProductId = async () => {
  const cartStore = useCartStore();
  if (!cartStore.productCart.length) return;
  // Create an array of promises
  const updatePromises = cartStore.productCart.map(async (item, index) => {
    if (item.product_id === "") {
      const response: any = await apiHandler('getCCProduct', { variant_id: item.variant_id });
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
