<template>
  <div>
    <FormSectionHeader label="Billing Information" />
    <div class="sm:flex sm:space-x-4">
      <CustomInput id="billingFirstName" v-model="formValues.billingFirstName" type="text" placeholder="First Name"
        :errorMessage="errors.billingFirstName" />
      <CustomInput id="billingLastName" v-model="formValues.billingLastName" type="text" placeholder="Last Name"
        :errorMessage="errors.billingLastName" />
    </div>
    <CustomInput id="billingAddress1" v-model="formValues.billingAddress1" type="text" placeholder="Address 1"
      :errorMessage="errors.billingAddress1" />
    <CustomInput id="billingAddress2" v-model="formValues.billingAddress2" type="text" placeholder="Apt, suite, etc. (optional)" />
    <CustomInput id="billingCity" v-model="formValues.billingCity" type="text" placeholder="Town / City"
      :errorMessage="errors.billingCity" />
    <div class="sm:flex sm:space-x-2">
      <CustomSelect id="billingCountry" v-model="formValues.billingCountry" :options="countries" optionsValue="countryCode"
        displayName="countryName" :errorMessage="errors.billingCountry" @change="handleBillStateList"
        placeholder="Select country" />
      <CustomSelect id="billingState" v-model="formValues.billingState" :options="billState" optionsValue="stateCode"
        displayName="stateName" :errorMessage="errors.billingState" placeholder="Select state" />
      <CustomInput id="billingPostalCode" v-model="formValues.billingPostalCode" type="text" placeholder="Postal Code"
        :errorMessage="errors.billingPostalCode" />
    </div>
  </div>
</template>

<script setup>
import CustomInput from "../CustomInput.vue";
import CustomSelect from "../CustomSelect.vue";
import FormSectionHeader from "../FormSectionHeader.vue";
import { useShippingStore } from "~/stores/shippingStore";

const props = defineProps({
  formValues: Object,
  errors: Object,
});

const shippingStore = useShippingStore();
const countries = ref(shippingStore.countries); // Make sure to use ref
const billState = ref(shippingStore.billState); // Make sure to use ref
// Handle the state list update
const handleBillStateList = () => {
  shippingStore.handleBillStateList();
};

// address auto complete
const initAutocomplete = () => {
  if (typeof google === 'undefined') {
    console.error("Google Maps API is not loaded.");
    return;
  }

  const input = document.querySelector('#billingAddress1');
  const autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place && place.formatted_address) {
      extractAddressComponents(place.address_components, 'bill');
    }
  })
}

onMounted(() => {
  initAutocomplete(); // Initialize on component mount
});

// Watch for updates to countries from the store
watch(
  () => shippingStore.countries,
  (newCountries) => {
    countries.value = newCountries; // Update local countries
    shippingStore.handleBillStateList();
  }
);

// Watch for updates to BillState from the store
watch(
  () => shippingStore.billState,
  (newBillState) => {
    billState.value = newBillState; // Update local BillState
  }
);
</script>
