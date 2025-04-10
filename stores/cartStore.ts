// stores/cartStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useCartStore = defineStore("cart", () => {
  const productCart = ref<any[]>([]); // Array to hold cart products
  const subTotal = ref(0); // Subtotal of cart
  // const discount = ref(0); // Discount applied to cart
  const salesTax = ref(0); // Sales tax applied to cart
  const shipping = ref(0); // Shipiing applied to cart
  const cartLoading = ref(false);
  const cartEmpty = ref(false);
  const discountLoading = ref(false);
  const shippingLoading = ref(false);
  const salesTaxLoading = ref(false);
  const couponSuccess = ref<any[]>([]);
  const couponError = ref<{}>({});
  const loadingCart = ref(false);
  const discount = computed(() => {
    if (couponSuccess.value.length > 0) {
      const value = couponSuccess.value.reduce((sum, item) => sum += item.price, 0);
      return value;
    }
    // Return 0 if no discounts are available
    return 0;
  });
  const cartTotal = computed(() => {
    storage.setSessionItem('subTotal', subTotal.value - discount.value);
    storage.setSessionItem('shipping', shipping.value);
    storage.setSessionItem('tax', salesTax.value);
    storage.setSessionItem('cartTotal', (subTotal.value - discount.value + salesTax.value + shipping.value).toFixed(2));
    return subTotal.value - discount.value + salesTax.value + shipping.value;
  });
  const cartTotalLoading = computed(() => {
    if (discountLoading.value || shippingLoading.value || salesTaxLoading.value) return true;
  });
  const addProduct = (product: any) => {
    const vipProduct = useRuntimeConfig().public.vipProduct;
    const router = useRouter();
    // Check if the product already exists in the cart
    const existingProduct = productCart.value.find(
      (item) =>
        item.product_id === product.product_id &&
        item.variant_id === product.variant_id
    );
    // If the product already exists, do not add it again
    if (existingProduct) {
      return;
    }
    // If it does not exist, add the product to the cart
    productCart.value.push(product);
    storage.setSessionItem('productCart', productCart.value)
    if (vipProduct !== product.product_id)
      router.push({ path: '/cart' });
  };
  const checkSessionProductCart = () => {
    loadingCart.value = true;
    console.log('sadsds', loadingCart.value)
    if (storage.getSessionItem('productCart')) {
      productCart.value = storage.getSessionItem('productCart') ?? [];
      updateSubTotal();
    }
  }
  const removeProduct = (productId: number) => {
    productCart.value = productCart.value.filter(
      (product) => product.product_id !== productId
    );
    storage.setSessionItem('productCart', productCart.value)
    updateSubTotal();
  };
  const updateSubTotal = () => {
    subTotal.value = productCart.value.reduce(
      (total, product) => total + (product.price * product.product_qty),
      0
    );
    console.log('subTotal:', subTotal.value);
  };
  const applyDiscount = (amount: number) => {
    discount.value = amount;
    updateLoading(false, 'discount');
  };
  const setSalesTax = (tax: number) => {
    salesTax.value = tax;
  };
  const loadCart = (status: string) => {
    if (status == "true") cartLoading.value = true;
    if (status == "false") cartLoading.value = false;
  };
  const emptyCart = (status: string) => {
    if (status == "true") cartEmpty.value = true;
    if (status == "false") cartEmpty.value = false;
  };
  const updateLoading = (status: boolean, type: string) => {
    if (type === "discount") discountLoading.value = status;
    if (type === "cart") cartLoading.value = status;
    if (type === "empty") cartEmpty.value = status;
    if (type === "shipping") shippingLoading.value = status;
    if (type === "salexTax") salesTaxLoading.value = status;
  }
  const updateShipping = (amount: number) => {
    shipping.value = amount;
    // updateLoading(false, 'cart');
  }
  const updateCart = (amount: number, type: string) => {
    if (type === "discount") applyDiscount(amount);
    if (type === "subTotal") updateSubTotal();
    if (type === "shipping") updateShipping(amount);
  }
  const updateCouponSuccess = (code: string, msg: string, price: number) => {
    if (couponSuccess.value.length === 2 && !duplicateCoupon(code)) {
      const index = couponSuccess.value.findIndex(coupon => coupon.code === 'VIP10');
      if (index == 0) couponSuccess.value.pop();
      else if (index === 1) couponSuccess.value.shift();
      else couponSuccess.value.shift();
      couponSuccess.value.push({ code, msg, price });
    } else if (!duplicateCoupon(code)) {
      couponSuccess.value.push({ code, msg, price });
    }
  }
  const updateCouponError = (code: string, msg: string) => {
    couponError.value = { code, msg };
  }
  const duplicateCoupon = (code: string) => {
    if (couponSuccess.value.length > 0) {
      return couponSuccess.value.some((item) => item.code === code);
    }
  }
  const removeCoupon = (code: string) => {
    if (couponSuccess.value.length > 0) {
      couponSuccess.value = couponSuccess.value.filter((item) => item.code !== code);
    }
    // Remove Error message
    if (couponError.value) {
      couponError.value = {};
    }
  }
  const updateProductQty = () => {
    // const product=productCart.value.find((item)=>item.product_id==product_id&&item.variant_id==variant_id);
    storage.setSessionItem('productCart', productCart.value);
    updateSubTotal();
  }

  return {
    productCart,
    loadingCart,
    subTotal,
    discount,
    salesTax,
    shipping,
    cartTotal,
    addProduct,
    removeProduct,
    applyDiscount,
    setSalesTax,
    cartLoading,
    cartEmpty,
    loadCart,
    emptyCart,
    discountLoading,
    updateLoading,
    updateCart,
    cartTotalLoading,
    shippingLoading,
    couponSuccess,
    couponError,
    updateCouponSuccess,
    updateCouponError,
    removeCoupon,
    salesTaxLoading,
    checkSessionProductCart,
    updateSubTotal,
    updateProductQty
  };
});
