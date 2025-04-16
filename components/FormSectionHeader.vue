<template>
  <h4  class="font-semibold font-poppins text-[16px] mt-6">{{ label }}</h4>
</template>
<script setup>
const props = defineProps({
    label: String
})
</script>