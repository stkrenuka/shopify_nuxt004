<template>
    <div class="mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none" v-html="bodyHtml" />
    <div class="flex  lg:justify-center justify-center  ">
                    <p class="lg:w-1/6 w-full text-xs mr-5">
                        <ClientOnly>
                            <i class="fab fa-facebook-f"></i>
                        </ClientOnly> Share
                    </p>
                    <p class="lg:w-1/6 w-full text-xs mr-5">
                        <ClientOnly>
                            <i class="fab fa-twitter"></i>
                        </ClientOnly> Tweet
                    </p>
                    <p class="lg:w-1/6 w-full text-xs lg:justify-start justify-end">
                        <ClientOnly>
                            <i class="fab fa-pinterest-p"></i>
                        </ClientOnly> Pin it
                    </p>
                </div>
  </template>

<script setup>
import { string } from 'zod';

const props = defineProps({
    bodyHtml:String
});

</script>