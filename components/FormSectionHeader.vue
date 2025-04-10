<template>
  <h4  class="font-semibold font-poppins text-[22px] mt-6">{{ label }}</h4>
</template>
<script setup>
const props = defineProps({
    label: String
})
</script>