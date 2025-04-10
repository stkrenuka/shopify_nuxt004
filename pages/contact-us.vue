<template>
  <!-- Hero Section -->
  <section class="text-center py-20 bg-cover bg-center">
    <h1 class="text-3xl text-black font-medium mb-6">
      Contact Us
      <hr class="w-[4rem] mx-auto border-t-4 border-black my-6">
    </h1>
  </section>
  <section class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
    <div class="w-5/6 mx-auto lg:justify-start justify-center sm:pb-[3rem]">
        <div class="grid__item large--four-fifths push--large--one-tenth">
          <div class="rte rte--nomargin rte--indented-images">
            <p>Hi, and thank you for visiting Brow Charm! </p>
            <p>If you have a question, there is a high chance that it can be answered
              in our <NuxtLink to="/faq" title="FAQ" class="text-[#9153ad] underline">FAQ</NuxtLink>. </p>
            <p>For immediate self-service help,<a href="https://help.browcharm.co/session" target="_blank" class="text-link">click here</a>
            </p>
            <p>If you need additional help, please don't hesitate to reach out to us at <NuxtLink to="mailto:support@browcharm.co" class="text-link">support@browcharm.co</NuxtLink> or call us at <NuxtLink
                to="tel:8003297248" class="text-link">(800) 329-7248</NuxtLink>. We typically reply in 1-2 business days.</p>
          </div>
        </div>
    </div>
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'site',
})
</script>
<style></style>