<script lang="ts" setup>
import { ref } from 'vue';
definePageMeta({
  layout: "site",
});
const ContactUsContent = ref<string>('');
const pageId=84844937410;

async function getContactUsContent() {
  const content= await getPageContent(pageId);
  ContactUsContent.value=content;
}
getContactUsContent();
</script>
<template>
  <!-- Hero Section -->
  <section class="text-center py-20 bg-cover bg-center">
    <h1 class="text-3xl text-black font-medium mb-6">
      Contact Us
      <hr class="w-[4rem] mx-auto border-t-4 border-black my-6">
    </h1>
  </section>
  <section class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
    <div class="w-5/6 mx-auto lg:justify-start justify-center sm:pb-[3rem]" id="contactUsSection">
        <div class="grid__item large--four-fifths push--large--one-tenth" v-html="ContactUsContent">
        </div>
    </div>
  </section>
</template>
<style >
/* Style links inside the v-html container */
#contactUsSection a {
  text-decoration: underline;
  color: #007BFF; /* You can change this to match your brand color */
  font-weight: 700;
  color: #8f51ac
}
</style>
