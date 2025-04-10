<template>
  <div class="breadcrumb_content mt-4 px-4">
    <p class="text-gray-700">
      <span @click="goBack" class="hover">Cart </span>
      <span class="text-gray-500">/ Checkout</span>
    </p>
  </div>
</template>

<script setup>
// GoBack
const goBack = () => {
  history.back(); // This calls the browser's back function
};
</script>
<style scoped>
.hover {
  cursor: pointer;
}
</style>
