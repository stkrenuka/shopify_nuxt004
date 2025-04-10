// FormTypes.ts

export interface FormData {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string; // Optional field
  city: string;
  country: string;
  state: string;
  postalCode: string;
  sameAddress: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingAddress1: string;
  billingAddress2?: string; // Optional field
  billingCity: string;
  billingCountry: string;
  billingState: string;
  billingPostalCode: string;
  shippingMethod: string;
  discountCode: string;
  paymentMethod: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "post"; // Specify allowed HTTP methods
  redirect: "follow" | "error" | "manual"; // Specify allowed redirect options
}

export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface mapToProductCartI{
  productId:string
  name:string,
  price: string,
  qty:number,
  variantDetailId:string,
  title:string
}

export interface ProductOption {
  name: string;
  values: string;
}
export interface Product {
  campaignProductId: string;
  productName: string;
  price: number | string;
  imageUrl: string;
}
export interface values{
  value:string[]
}