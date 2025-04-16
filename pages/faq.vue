<script lang="ts" setup>
import { ref } from 'vue';
definePageMeta({
  layout: "site",
});
const faqContent = ref<string>('');
const pageId=84845134018;

async function getFaqContent() {
  const content= await getPageContent(pageId);
  faqContent.value=content;
}
getFaqContent();
</script>
<template>
  <section class="text-center lg:pt-20 lg:pb-10 pt-5 pb-5 relative bg-cover bg-center">
    <div class="relative z-10">
      <h1 class="text-3xl text-black font-medium mb-6">
        FAQ
        <hr class="w-[3rem] mx-auto border-t-1 border-black my-5" />
      </h1>
    </div>
  </section>
  <section class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
    <div class="lg:w-[65%] w-full mx-auto lg:justify-start justify-center" id="faqSection">
     <div v-html="faqContent"></div>
    </div>
  </section>
</template>



<style >
/* Style links inside the v-html container */
#faqSection a {
  text-decoration: underline;
  color: #007BFF; /* You can change this to match your brand color */
  font-weight: 700;
  color: #8f51ac
}
</style>