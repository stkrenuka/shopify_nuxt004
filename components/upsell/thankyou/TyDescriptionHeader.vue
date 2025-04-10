<template>
    <section>
        <div class="rounded-md flex items-center bg-[#e8e8e8] px-5 py-3 md:w-[600px]">
            <img src="/images/lock.svg" alt="icon">
            <p class="font-semibold text-base md:text-lg">Feel free to email us with any questions:</p>
        </div>
        <Spacer :mt="5" />
        <div class="md:w-[600px] flex items-center gap-3">
            <img src="/images/mail.png" alt="msgBox" width="70" class="h-[60px]" >
            <article>
                <div class="flex gap-1">
                    <Text placeholder="EMAIL: " />
                    <p class="font-bold"><a :href="'mailto:'+svarsiteEmail"> {{ svarsiteEmail }}</a></p>
                </div>
                <Text align="start"
                    placeholder="If you have any questions about your order, please send us an email and we will get back to you within 24 hours." />
            </article>
        </div>
        <Spacer :mb="5" />
    </section>
</template>
<script setup>
import Spacer from '~/components/Spacer.vue';
import Text from '../Text.vue';
const svarsiteEmail=useRuntimeConfig().public.email;

</script>