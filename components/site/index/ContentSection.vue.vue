<template>
  <section
    class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4 lg:py-10">

    <div v-if="imageFirst" class="lg:w-1/2 w-full flex lg:justify-start justify-center sm:pb-[3rem] py-10">
      <NuxtImg :src="imageSrc" :alt="title" loading="lazy" />
    </div>
    <div class="lg:w-1/2 w-full lg:justify-start justify-center lg:px-10 py-10">
      <h2 class="text-xl font-bold uppercase tracking-widest">{{ title }}</h2>
      <p class="tracking-wide mb-3">{{ description }}</p>
      <NuxtLink :to="buttonLink"
        class="bg-[#8f51ac] font-semibold uppercase text-sm text-white py-3 px-6 rounded-sm hover:bg-[#aa7ac0]">
        {{ buttonText }}
      </NuxtLink>
    </div>
    <div v-if="!imageFirst" class="lg:w-1/2 w-full flex lg:justify-end justify-center">
      <NuxtImg :src="imageSrc" :alt="title" loading="lazy"
        class="h-[500px] sm:max-h-[514px] w-[500px] sm:max-w-[514px]" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  imageSrc: String,
  buttonLink: String,
  buttonText: String,
  imageFirst: Boolean // Determines whether image is placed first
});
</script>
