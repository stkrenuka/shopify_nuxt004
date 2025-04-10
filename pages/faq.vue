<script setup lang="ts">
import { faqSections } from "~/utils/site/siteHelper.ts";

definePageMeta({
  layout: "site",
});

const formatText = (text: string) => {
  if (!text) return "";

  // Regex to detect email addresses and phone numbers
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\(\d{3}\)\s*\d{3}-\d{4})/g;

  return text
    .replace(emailRegex, `<a href="mailto:$1" class="text-link"><strong>$1</strong></a>`)
    .replace(phoneRegex, `<a href="tel:$1" class="text-link"><strong>$1</strong></a>`)
    .replace(/\n/g, "<br><br>")
    .replace(
      "Sign up here",
      '<span><a href="https://manage.kmail-lists.com/subscriptions/subscribe?a=UsRnHL&g=UMLq3J&_atid=SvJgjcnb13219BP93yE5yxEIBHvx6O" target="_blank"   class="text-link"><strong>Sign up here</strong></a></span>'
    ).replace('HASSLE FREE RETURNS & EXCHANGES FOR 30-DAYS','<strong>HASSLE FREE RETURNS &amp; EXCHANGES FOR 30-DAYS! </strong>')
};
</script>

<template>
  <!-- Hero Section -->
  <section class="text-center pt-20 pb-10 relative bg-cover bg-center">
    <div class="relative z-10">
      <h1 class="text-3xl text-black font-medium mb-6">
        FAQ
        <hr class="w-[4rem] mx-auto border-t-4 border-black my-6" />
      </h1>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4">
    <div class="w-4/5 mx-auto lg:justify-start justify-center sm:pb-[3rem]">
      <div v-for="section in faqSections" :key="section.title">
        <p class="font-bold">{{ section.title }}</p>

        <div v-for="item in section.items" :key="item.question" class="mt-2">
          <p class="font-bold">{{ item.question }}</p>
          <p v-html="formatText(item.answer)"></p>

          <!-- Lists Section -->
          <div v-if="item.list || item.orderedList" class="mt-4">
            <ul v-if="item.list && !item.orderedList" class="list-disc pl-5 leading-7">
              <li v-for="(listItem, index) in item.list" :key="index">{{ listItem }}</li>
            </ul>
            <ol v-if="item.orderedList" class="list-decimal pl-5 mt-2 leading-7">
              <li v-for="(orderedItem, index) in item.list" :key="index">
                {{ orderedItem }}
              </li>
            </ol>
          </div>

          <!-- Specials Section -->
          <div v-if="item.specials && item.specials.length" class="mt-4">
            <div v-for="special in item.specials" :key="special.special">
              <p class="font-bold">★&nbsp;&nbsp;&nbsp;&nbsp;{{ special.special }}</p>
              <p>{{ special.text }}</p>
            </div>
            <p>
              <NuxtLink to="/products/10090278125842" class="text-link">
                <strong>Shop Now</strong>
              </NuxtLink>
            </p>
          </div>

          <!-- Image Section -->
          <div v-if="item.image" class="mt-4">
            <NuxtImg alt="Payment methods" src="/images/payment.png" class="rte__no-indent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
