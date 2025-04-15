<script setup lang="ts">
definePageMeta({
  layout: 'site',
})
import { ref, onMounted } from 'vue';

const isMobile = ref(false);

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>
 MNBxNXbHXjZXJNxAKbabcchjvfkhjfhgjhfgjfghjhjhrjrhjrhjrfhjrhjrhrrrrjrjfhrhjhrjhhjrhjrjhrhjrhjrhjhjrhjgjhgrhjgrhjgrhjrghjrhjhjrhjhjjhrhjrhjhjhjhjrhjgrhrhjrghjhgrhrrrgg,kjv ugfhfghmdfgh,kfdjhfd.kfhdj gklf jlkfj gk gkfj krjkrjr jkr jjrjjrklrgkrl jrklrkrljklrjkrtkrjktrjk krkkrkrkr kr kr kr kr
<template>
  <SiteIndexHeroSectionVue />
  <SiteIndexContentSectionVue title="Perfect Brows Every Time"
    description="Symmetrical and even. The Stencil Kit gives you guidance for perfect brows every time!"
    imageSrc="/images/BrowCharm.jpg" buttonLink="/products/10090278125842" buttonText="Shop Now"
    :imageFirst="false" />

  <SiteIndexContentSectionVue title="Save Time"
    description="Just align and stamp! Fill in brows with the Stencil Kit in seconds." imageSrc="/images/BrowCharm1.jpg"
    buttonLink="/products/10090278125842" buttonText="Shop Now" :imageFirst="!isMobile" />

  <SiteIndexContentSectionVue title="Long-Lasting Wear"
    description="No smudging or fading. Enjoy the lasting, waterproof formula of Stencil Kit for all day wear!"
    imageSrc="/images/BrowCharm2.jpg" buttonLink="/products/10103951982866"
    buttonText="Shop Now" :imageFirst="false" />
  <SiteIndexTestimonialSectionVue />
  <SiteIndexProductSection/>
  <LazySiteIndexSubscribeVue />
</template>