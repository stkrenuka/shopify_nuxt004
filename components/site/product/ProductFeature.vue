<template>
    <div class="mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none" v-html="bodyHtml" />
    <SiteSocialMedia/>
  </template>

<script setup>
import { string } from 'zod';

const props = defineProps({
    bodyHtml:String
});

</script>