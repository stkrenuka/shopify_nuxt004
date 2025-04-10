<template>
  <Spacer />
  <div class="accordion-container border-4 border-[#ccc] p-6">
    <h3 class="text-center font-poppins font-bold text-lg mb-5">
      Frequently Asked Questions
    </h3>
    <!-- First Faq -->
    <div class="accordion-item">
      <button @click="toggleAccordion(0)" :aria-expanded="openIndex === 0" :aria-controls="'accordion-body-' + 0"
        :class="{ 'bg-[#e9e9e9]': openIndex === 0 }"
        class="flex items-center justify-between sm:w-full w-full p-4 font-semibold bg-[#cbd5e1] text-black border border-b-0 rounded-tl-md rounded-tr-md border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-[#e9e9e9]">
        <span class="text-left">What is your return & exchange policy?</span>
        <svg :class="{ 'rotate-180': openIndex === 0 }" class="w-3 h-3 transition-transform transform"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div v-show="openIndex === 0" :id="'accordion-body-' + 0" class="p-5 border border-gray-200 bg-white">
        This Returns and Exchanges Policy applies to all purchases made through the website We are pleased to
        accommodate returns and exchanges within 30 days on all products that have not been used and in the same
        original packaging that you received it. A photo of the product will be requested before the returns process
        starts.
      </div>
    </div>
    <!-- Second Faq -->
    <div class="accordion-item">
      <button @click="toggleAccordion(1)" :aria-expanded="openIndex === 1" :aria-controls="'accordion-body-' + 1"
        :class="{ 'bg-[#e9e9e9]': openIndex === 1 }"
        class="flex items-center justify-between w-full p-4 font-semibold bg-[#cbd5e1] text-black border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-[#e9e9e9]">
        <span class="text-left">What is the return period?</span>
        <svg :class="{ 'rotate-180': openIndex === 1 }" class="w-3 h-3 transition-transform transform"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div v-show="openIndex === 1" :id="'accordion-body-' + 1" class="p-5 border border-gray-200 bg-white">
        If for any reason you are unsatisfied with your purchase returns will be accepted within 30 days of purchase.
      </div>
    </div>
    <!-- Third Faq -->
    <div class="accordion-item">
      <button @click="toggleAccordion(2)" :aria-expanded="openIndex === 2" :aria-controls="'accordion-body-' + 2"
        :class="{ 'bg-[#e9e9e9]': openIndex === 2 }"
        class="flex items-center justify-between w-full p-4 font-semibold bg-[#cbd5e1] text-black border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-[#e9e9e9]">
        <span class="text-left">Do I have to pay for the shipping of my return?</span>
        <svg :class="{ 'rotate-180': openIndex === 2 }" class="w-3 h-3 transition-transform transform"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div v-show="openIndex === 2" :id="'accordion-body-' + 2" class="p-5 border border-gray-200 bg-white">
        Yes, all customers are responsible for their own
        return shipping costs. We recommend that you send
        your return with a tracking option via USPS, UPS
        or FedEx insured parcel post because we will not
        be responsible for lost returns.
      </div>
    </div>
    <!-- Fourth Faq -->
    <div class="accordion-item">
      <button @click="toggleAccordion(3)" :aria-expanded="openIndex === 2" :aria-controls="'accordion-body-' + 2"
        :class="{ 'bg-[#e9e9e9]': openIndex === 2 }"
        class="flex items-center justify-between w-full p-4 font-semibold bg-[#cbd5e1] text-black border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-[#e9e9e9]">
        <span class="text-left">How can I track my returns?</span>
        <svg :class="{ 'rotate-180': openIndex === 2 }" class="w-3 h-3 transition-transform transform"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div v-show="openIndex === 3" :id="'accordion-body-' + 2" class="p-5 border border-gray-200 bg-white">
        Track your return/exchange using the information provided by your carrier to ensure it has 
        been delivered. We will send you a return confirmation email once we have received your 
        package and refund has been processed, you can also view the status of your return or 
        exchange in your online order history.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomLink from '../CustomLink.vue';

// Sample FAQ data
const items = [
  {
    question: 'What is your return & exchange policy?',
    answer: 'This Returns and Exchanges Policy applies to all purchases made through the website browcharm.co. We accommodate returns and exchanges within 30 days on all products that have not been used and are in the original packaging.',
  },
  {
    question: 'Is there a Figma file available?',
    answer: 'Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.',
  },
  {
    question: 'What are the differences between Flowbite and Tailwind UI?',
    answer: 'The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product.',
  },
];

const openIndex = ref(0);

function toggleAccordion(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<style scoped>
/* Custom styles if necessary */
</style>