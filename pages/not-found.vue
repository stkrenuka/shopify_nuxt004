
<script setup>
definePageMeta({
  layout: "site",
});
</script>
<template>
  <section class="bg-gray-100 flex items-center justify-center min-h-screen px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-800">404</h1>
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">Oops! Page not found.</h2>
      <p class="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <NuxtLink
        to="/"
        class="mt-6 inline-block px-6 py-3 bg-[#8c52aa] text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* No custom styles needed right now */
</style>
