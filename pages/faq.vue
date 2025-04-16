<script lang="ts" setup>
import { ref } from 'vue';
definePageMeta({
  layout: "site",
});
const faqContent = ref<string | null>(null);

function faqSection() {
  faqContent.value=`<p><strong>About</strong></p>`;
}

</script>

<template>
  <section class="text-center pt-20 pb-10 relative bg-cover bg-center">
    <div class="relative z-10">
      <h1 class="text-3xl text-black font-medium mb-6">
        FAQ
        <hr class="w-[4rem] mx-auto border-t-4 border-black my-6" />
      </h1>
    </div>
  </section>

  <section class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
    <div class="w-4/5 mx-auto lg:justify-start justify-center sm:pb-[3rem]" id="faqSection">
     <div v-html="faqContent"></div>faasf
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