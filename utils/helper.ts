import type { RequestOptions } from "./interface";
export const requestOptions: RequestOptions = {
  method: "POST",
  redirect: "follow",
};
export const inputConfig = {
  customerInfo: [
    {
      model: 'phone',
      type: 'text',
      placeholder: 'Phone (For Tracking Confirmation)',
      errorMessage: 'errors.phone',
      maxLength: 10,
      regex: '^[0-9]*$',
    },
    {
      model: 'email',
      type: 'email',
      placeholder: 'Email (For Order Confirmation)',
      errorMessage: 'errors.email',
      maxLength: 50, // Optional, you can omit if not needed
    }
  ],
  paymentInfo: [
    {
      model: 'cardNumber',
      type: 'text',
      placeholder: 'Card Number',
      errorMessage: 'errors.cardNumber',
      maxLength: 16,
      regex: '^[0-9]*$',
    },
    {
      model: 'expiryMonth',
      type: 'text',
      placeholder: 'MM',
      errorMessage: 'errors.expiryMonth',
      maxLength: 2,
      regex: '^[0-9]*$',
    },
    {
      model: 'expiryYear',
      type: 'text',
      placeholder: 'YYYY',
      errorMessage: 'errors.expiryYear',
      maxLength: 4,
      regex: '^[0-9]*$',
    },
    {
      model: 'cvv',
      type: 'text',
      placeholder: 'CVV Code',
      errorMessage: 'errors.cvv',
      maxLength: 4,
      regex: '^[0-9]*$',
    },
  ],
}
export const emptyCart = {
  product_id: 1,
  title: 'Your cart is empty',
  variant_id: '',
  price: 0,
  image: '/images/empty-cart.png',
  variant_title: 'Add something to make me happy :)',
  product_qty: 0,
};
export const upsellConfig = {
  offer1: {
    pageType: "upsellPage1",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "As a special thanks, we would like to offer you the Brow Charm™ Stencil Kit For 57% off.",
    productImg: "/images/offer1/up-1-img.jpg",
    kitPrice: [{ kit: '1 - 3 Kits', price: '17.00 each' }, { kit: '4 - 6 Kits', price: '15.00 each' }, { kit: '7 - 12 Kits', price: '13.00 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    event: "Purchase",
    stepCompleted: { yes: 3, no: 2 },
    nextStep: { yes: "/offer2", no: "/offer1_1" },
  },
  offer1_1: {
    pageType: "upsellPage1",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "As a special thanks, we would like to offer you the Brow Charm™ Stencil Kit For 60% OFF.",
    productImg: "/images/offer1/up-1-img.jpg",
    kitPrice: [{ kit: '1 - 3 Kits', price: '16.00 each' }, { kit: '4 - 6 Kits', price: '14.00 each' }, { kit: '7 - 12 Kits', price: '12.00 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    event: "Purchase",
    stepCompleted: { yes: 3, no: 3 },
    nextStep: { yes: "/offer2", no: "/offer2" },
  },
  offer2: {
    pageType: "upsellPage2",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "As a special thanks, we would like to offer you the Brow Charm™ Vibely Mascara For 30% OFF.",
    productImg: "/images/offer2/up-2-img.webp",
    kitPrice: [{ kit: '1 - 3 Kits', price: '19.00 each' }, { kit: '4 - 6 Kits', price: '17.00 each' }, { kit: '7 - 12 Kits', price: '13.00 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    event: "Upsell1cv",
    stepCompleted: { yes: 5, no: 4 },
    nextStep: { yes: "/offer3", no: "/offer2_1" },
  },
  offer2_1: {
    pageType: "upsellPage2",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "Last Chance! Get More Brow Charm™ Discounted Vibely Mascara for 37% OFF.",
    productImg: "/images/offer2/up-2-img.webp",
    kitPrice: [{ kit: '1 - 3 Kits', price: '18.00 each' }, { kit: '4 - 6 Kits', price: '16.00 each' }, { kit: '7 - 12 Kits', price: '12.00 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    event: "Upsell1cv",
    stepCompleted: { yes: 5, no: 5 },
    nextStep: { yes: "/offer3", no: "/offer3" },
  },
  offer3: {
    pageType: "upsellPage3",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "As a special thanks, we would like to offer you the Brow Charm™ Vibely EyeLiner For 45% off.",
    productImg: "/images/offer3/up-3-img.jpg",
    kitPrice: [{ kit: '1 - 3 Kits', price: '19.95 each' }, { kit: '4 - 6 Kits', price: '17.95 each' }, { kit: '7 - 10 Kits', price: '12.95 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    stepCompleted: { yes: 7, no: 6 },
    nextStep: { yes: "/offer4", no: "/offer3_1" },
    event: "Upsell2cv"
  },
  offer3_1: {
    pageType: "upsellPage3",
    header: "You Can't Leave Without Taking ADVANTAGE of this SPECIAL OFFER!",
    heading: "Last Chance! As a special thanks, we would like to offer you the Brow Charm™ Vibely EyeLiner For 60% off.",
    productImg: "/images/offer3/up-3-img.jpg",
    kitPrice: [{ kit: '1 - 3 Kits', price: '14.95 each' }, { kit: '4 - 6 Kits', price: '12.95 each' }, { kit: '7 - 10 Kits', price: '10.95 each' }],
    submitBtnTitle: "COMPLETE CHECKOUT",
    stepCompleted: { yes: 7, no: 7 },
    nextStep: { yes: "/offer4", no: "/offer4" },
    event: "Upsell2cv"
  },
  offer4: {
    pageType: "upsellPage4",
    productImg: "/images/offer4/up-4-img.jpg",
    submitBtnTitle: "COMPLETE CHECKOUT",
    event: "Upsell3cv",
    stepCompleted: { yes: 8, no: 8 },
    nextStep: { yes: "/thankyou", no: "/thankyou" },
  },

}