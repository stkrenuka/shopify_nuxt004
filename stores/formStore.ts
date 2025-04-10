// stores/formStore.ts
import cardValidator from "card-validator";
import { defineStore } from "pinia";
import { ref } from "vue";
import { z } from "zod";
import type { FormData } from "../utils/interface"; // Adjust the path as needed
import { useCheckoutStore } from "./checkoutStore";
import { useShippingStore } from "./shippingStore";

export const useFormStore = defineStore("form", () => {
  // Form Schema
  const formSchema = ref<FormData>({
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    sameAddress: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress1: "",
    billingAddress2: "",
    billingCity: "",
    billingCountry: "",
    billingState: "",
    billingPostalCode: "",
    shippingMethod: '5',
    discountCode: "",
    paymentMethod: "CREDITCARD",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  // Validation Schema
  const schema = z.object({
    email: z.string().email("Invalid email format"),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    address1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(5, "Postal Code is required"),
    billingFirstName: z.string().min(1, "Billing First Name is required"),
    billingLastName: z.string().min(1, "Billing Last Name is required"),
    billingAddress1: z.string().min(1, "Billing Address is required"),
    billingCity: z.string().min(1, "Billing City is required"),
    billingCountry: z.string().min(1, "Billing Country is required"),
    billingState: z.string().min(1, "Billing State is required"),
    billingPostalCode: z.string().min(5, "Billing Postal Code is required"),
    shippingMethod: z.string().min(1, "Shipping Method is required"),
    cardNumber: z.string()
      .min(12, "Card number is required")
      .refine((val) => isValidCardNumber(val), {
        message: "Invalid card number",
      }),
    expiryMonth: z.string().min(1, "Expiry Month is required"),
    expiryYear: z.string().min(4, "Expiry Year is required"),
    cvv: z.string().min(3, "CVV is required"),
  });

  // shippingStore
  const shippingStore = useShippingStore();
  // checkoutStore
  const checkoutStore = useCheckoutStore();
  const formValues = formSchema;
  const errors = ref<Record<string, string>>({});

  const handleError = (input: any) => {
    errors.value[input] = [""];
  }

  // BrainTree for credit card validation
  const isValidCardNumber = (number: string): boolean => {
    if (checkoutStore.tester) return checkoutStore.tester
    const valid = cardValidator;
    const result = valid.number(number);
    return result.isValid;
  };

  // Function to validate expiry month and year
  const validateExpiryDate = (month: string, year: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10);

    if (parsedMonth > 12) {
      errors.value.expiryMonth = ["Invalid month"];
    }

    // Check if the expiry date is in the past
    if (parsedYear < currentYear || (parsedYear === currentYear && parsedMonth < currentMonth)) {
      errors.value.expiryYear = ["Card is Expired"]; // Expired
    }

    // Check if the expiry date is more than 10 years in the future
    if (parsedYear > currentYear + 10) {
      errors.value.expiryYear = ["Invalid Year"]; // More than 10 years in the future
    }

    return !(errors.value.expiryMonth && errors.value.expiryMonth[0] || errors.value.expiryYear && errors.value.expiryYear[0]);
  }

  // Handle Form Submit
  const handleSubmit = async () => {
    await billSame("same");
    const validationResult = schema.safeParse(formValues.value);
    if (!validationResult.success && formValues.value.paymentMethod !== "PAYPAL") {
      errors.value = validationResult.error.formErrors.fieldErrors;

      let errorMessages = Object.entries(errors.value)
        .flatMap(([field, messages]) =>
          messages.map(() => `${field[0].toUpperCase()}${field.slice(1)},`)
        )
        .join("\n");
      checkoutStore.updateAlert(true, `${errorMessages} are required fields`);
      if (!validateExpiryDate(formValues.value.expiryMonth, formValues.value.expiryYear)) {
        checkoutStore.updateAlert(true, `${errorMessages} are required fields`);
        return;
      };
    } else {
      if (formValues.value.paymentMethod === "CREDITCARD") {
        if (!validateExpiryDate(formValues.value.expiryMonth, formValues.value.expiryYear)) {
          let expiryError: string = "";
          if (errors.value.expiryMonth?.[0]) expiryError = "ExpiryMonth";
          if (errors.value.expiryYear?.[0]) expiryError += expiryError ? " ExpiryYear" : "ExpiryYear";
          checkoutStore.updateAlert(true, `${expiryError} are required fields`);
          return;
        }
      }

      checkoutStore.setTransactionStatus(true);
      if (!storage.getSessionItem("sessionId")) await importClick();
      if (formValues.value.paymentMethod === "CREDITCARD") await importLead();
      await importOrder();
      errors.value = {}; // Clear errors
      checkoutStore.setTransactionStatus(false);
    }
  };

  // Make Billing Details Same as Shipping Details
  const billSame = async (type = "onLoad") => {
    try {
      if (type === "onLoad") {
        // await shippingStore.updateStateByName(checkoutStore.defaultRegion); // not updating by default
        await shippingStore.handleBillStateList();
        // await shippingStore.updateBillStateByName(checkoutStore.defaultRegion);
      }
      if (formValues.value.sameAddress) {
        formValues.value.billingFirstName = formValues.value.firstName;
        formValues.value.billingLastName = formValues.value.lastName;
        formValues.value.billingAddress1 = formValues.value.address1;
        formValues.value.billingAddress2 = formValues.value.address2;
        formValues.value.billingCity = formValues.value.city;
        formValues.value.billingCountry = formValues.value.country;
        formValues.value.billingPostalCode = formValues.value.postalCode;
        await shippingStore.handleBillStateList();
        formValues.value.billingState = formValues.value.state;
      }
      shippingStore.updateShipping();
    } catch (error) {
      console.error("Error updating billing address:", error);
    }

  }

  return {
    formValues,
    errors,
    handleSubmit,
    handleError,
    billSame,
  };
});
