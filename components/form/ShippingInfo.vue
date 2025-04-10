<template>
  <div class="mt-6">
    <FormSectionHeader label="Delivery" />
    <CustomSelect id="country" v-model="formValues.country" :options="countries" optionsValue="countryCode"
      displayName="countryName" :errorMessage="errors.country" @change="handleStateList" placeholder="United States" />
    <div class="sm:flex sm:space-x-4 w-full">
      <CustomInput id="firstName" v-model="formValues.firstName" type="text" placeholder="First Name"
        :errorMessage="errors.firstName" :submitPartialOrder="submitPartialOrder" />
      <CustomInput id="lastName" v-model="formValues.lastName" type="text" placeholder="Last Name"
        :errorMessage="errors.lastName" :submitPartialOrder="submitPartialOrder" />
    </div>
    <CustomInput id="address1" @focus="initAutocomplete" v-model="formValues.address1" type="text"
      placeholder="Address 1" :errorMessage="errors.address1" :submitPartialOrder="submitPartialOrder" />
    <CustomInput id="address2" v-model="formValues.address2" type="text" placeholder="Address 2" />

    <div class="sm:flex sm:space-x-4">
      <CustomInput id="city" v-model="formValues.city" type="text" placeholder="Town / City" :errorMessage="errors.city"
        :submitPartialOrder="submitPartialOrder" />
      <CustomSelect id="state" v-model="formValues.state" :options="shipState" optionsValue="stateCode"
        displayName="stateName" :errorMessage="errors.state" placeholder="Select state" />
      <CustomInput id="postalCode" v-model="formValues.postalCode" type="text" placeholder="Postal Code"
        :errorMessage="errors.postalCode" :maxLength="10" :submitPartialOrder="submitPartialOrder" />
    </div>

  </div>
</template>

<script setup>
import { useShippingStore, useFormStore } from "~/stores";
import CustomInput from "../CustomInput.vue";
import CustomSelect from "../CustomSelect.vue";
import FormSectionHeader from "../FormSectionHeader.vue";

const shippingStore = useShippingStore();
const formStore = useFormStore();
const countries = ref(shippingStore.countries); // Make sure to use ref
const shipState = ref(shippingStore.shipState); // Make sure to use ref
// Handle the state list update
const handleStateList = () => {
  shippingStore.handleStateList();
};

const props = defineProps({
  formValues: Object,
  errors: Object,
});

const handleBillSame = () => {
  props.formValues.sameAddress = !props.formValues.sameAddress
  formStore.billSame("same");
}

// address auto complete
const initAutocomplete = () => {
  if (typeof google === 'undefined') {
    console.error("Google Maps API is not loaded.");
    return;
  }

  const input = document.querySelector('#address1');
  const autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place && place.formatted_address) {
      extractAddressComponents(place.address_components);
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
    shippingStore.handleStateList();
  }
);

// Watch for updates to shipState from the store
watch(
  () => shippingStore.shipState,
  (newShipState) => {
    shipState.value = newShipState; // Update local shipState
  }
);
</script>
