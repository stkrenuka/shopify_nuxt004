<template>
  <div>
    <FormSectionHeader label="Contact" />
    <CustomInput id="email" v-model="formValues.email" type="email" placeholder="Email (For Order Confirmation)"
      :errorMessage="errors.email" :maxLength="50" :submitPartialOrder="submitPartialOrder" />

    <section id="phone-field">
      <CustomInput id="phone" v-model="formValues.phone" type="text"
        placeholder="Phone (For Ship Tracking Confirmation)" :errorMessage="errors.phone" :maxLength="14"
        regex="^[0-9]*$" :submitPartialOrder="submitPartialOrder" />
    </section>
  </div>
  <div class="flex items-center mb-4 mt-2">
    <input id="emailOptIn" type="checkbox" value="" class="w-4 h-4 custom-checkbox" @click="handleEmailOptIn()"
      v-model="checkoutStore.emailOptIn">
    <label for="emailOptIn" class="ms-2 text-base font-regular text-gray-900 dark:text-gray-300 ">Email me
      with news
      and offers</label>
  </div>
</template>

<script setup>
import { useCheckoutStore } from "~/stores";
import CustomInput from "../CustomInput.vue";
import FormSectionHeader from "../FormSectionHeader.vue";

const props = defineProps({
  formValues: Object,
  errors: Object,
});
// Checkout store
const checkoutStore = useCheckoutStore();

// Directly assign the customerInfo array to inputFields
const inputFields = inputConfig.customerInfo;
const handleEmailOptIn = () => {
  checkoutStore.emailOptIn = !checkoutStore.emailOptIn;
}
</script>
<style scoped>
.custom-checkbox:checked {
  accent-color: #a26b25 !important;
  color: #fff !important;
}
</style>
