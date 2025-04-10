<template>
  <section
    class="container mx-auto lg:flex justify-between items-center px-4 max-w-[1050px] lg:px-7 sm:w-full sm:px-4 lg:py-10 sm:py-10 py-10">
    <div class="text-center">
      <h1 class="text-4xl font-medium font-varela">What Others Are Saying</h1>

      <div v-for="(testimonial, index) in testimonials" :key="index" class="my-8">
        <NuxtImg src="/images/star.png" alt="5-star rating" class="mx-auto lg:pb-4" width="150" height="30"
          loading="lazy" />
        <p class="text-center text-xl">{{ testimonial.text }} <span class="font-bold">- {{ testimonial.author }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    text: "I was skeptical at first, but when I lined up the stencil and lightly went over my brow and took the stencil off... WOWWWWWWWW amazing! This is a game changer for me and boosted my confidence up a bit too.",
    author: "Phoenix",
  },
  {
    text: "The stencils give you a wide range of options in shaping your brows. Ease of use is what it’s all about. Beats pencils or powders.",
    author: "Regina K.",
  },
  {
    text: "I am not good at drawing eyebrows. However, this stamp kit elevated my brow game. I simply placed the plastic shaper over my brow and rubbed the mushroom across it and voila I had perfect brows. I love this.",
    author: "Angelia M.",
  },
];
</script>

<style scoped>
.font-varela {
  font-family: "Varela", sans-serif;
}
</style>
