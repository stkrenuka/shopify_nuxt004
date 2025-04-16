<template>
  <FormSectionHeader :label="'Payment'" />
  <small class="text-gray-500 font-poppins">All transactions are secure and encrypted</small>
  <div class="pay-box lg:mt-10 mt-5">
    <input type="radio" name="paymentMethod" id="creditCard" value="CREDITCARD" v-model="formValues.paymentMethod"
      checked />
    <label for="creditCard" class="font-montserrat font-medium text-base text-black"
      :class="{ 'border-red-950 border-2': formValues.paymentMethod === 'CREDITCARD' }">
      <span>Credit Card</span>
      <NuxtImg src="/images/cart-logo.jpg" loading="lazy" class="w-40 card-cls " width="160" height="28" />
    </label>
    <div class="collapse bg-stone-100 border border-gray-100 p-4">
      <CustomInput id="cardNumber" v-model="formValues.cardNumber" type="text" placeholder="Card Number"
        :errorMessage="errors.cardNumber" :maxLength="16" regex="^[0-9]*$" />
      <div class="flex  sm:grid sm:grid-cols-3 sm:gap-3">
        <CustomInput id="expiryMonth" v-model="formValues.expiryMonth" type="text" placeholder="Month"
          :errorMessage="errors.expiryMonth" :maxLength="2" regex="^[0-9]*$" />
        <CustomInput id="expiryYear" v-model="formValues.expiryYear" type="text" placeholder="Year"
          :errorMessage="errors.expiryYear" :maxLength="4" regex="^[0-9]*$" />
        <CustomInput id="cvv" v-model="formValues.cvv" type="text" placeholder="CVV Code" :errorMessage="errors.cvv"
          :maxLength="4" regex="^[0-9]*$" />
      </div>
    </div>

    <input type="radio" name="paymentMethod" id="paypal" value="PAYPAL" v-model="formValues.paymentMethod" />
    <label for="paypal" class="font-medium text-base text-black"
      :class="{ 'font-montserrat border-red-950 border-2': formValues.paymentMethod === 'PAYPAL' }">PayPal
      <NuxtImg src="/images/paypal-small.png" loading="lazy" class="w-20 card-cls " width="100" height="28" />
    </label>
    <div class="collapse bg-gray-50 border border-gray-300 p-6">
      <NuxtImg @click="handleSubmit" src="/images/paypal-checkout.png" width="300" height="100"
        class="w-200 mx-auto cursor-pointer" loading="lazy" />
      <p class="text-sm text-gray-500 text-center">Email and Phone required for
        Shipping and Order confirmation.</p>
    </div>
  </div>
</template>
<script setup>
import CustomInput from "../CustomInput.vue";
import FormSectionHeader from "../FormSectionHeader.vue";
import { useFormStore } from "~/stores";

const props = defineProps({
  formValues: Object,
  errors: Object,
});

// formStore
const formStore = useFormStore();
const { handleSubmit } = formStore;
</script>
<style scoped>
.card-cls {
  position: absolute;
  top: 14px;
  right: 5%;
}

.pay-box input[type=radio] {
  display: block;
  margin: 17px 0 -37px;
  position: relative;
  width: 20px;
  height: 20px;
  z-index: 10;
  left: 12px;
  accent-color: #a26b25 !important;
  color: #fff !important;
}

.pay-box label:hover {
  background: #fff;
}



.pay-box .content {
  background: #e2e5f6;
  padding: 10px 25px;
  border: 1px solid #a7a7a7;
  margin: 0 0 1px 0;
  border-radius: 3px;
}

.pay-box input+label+.collapse {
  display: none;
}

.pay-box input:checked+label+.collapse {
  display: block;
}

.collapse {
  visibility: visible;
}

label.font-montserrat.font-bold.border-red-950 {
  background-color: #fef5ef;
  border: 1px solid #a26b25 !important;
  border-top-left-radius: 5px !important;
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

@media (max-width: 640px) {
  .sm\:gap-3 {
    gap: 0.75rem;
  }
}
</style>
