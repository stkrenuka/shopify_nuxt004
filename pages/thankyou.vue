<template>
    <section id="thankyouPage"
        class="flex w-full flex-col items-center justify-center px-5 border-t-8 border-[#8f51ac] bg-white">
        <Text fontWeight="bold" :fontSize="30" placeholder="Congrats - Order Complete!" />
        <Spacer :mt='5' />
        <Text fontWeight="bold" placeholder="Thank You!" />
        <Spacer :mt="5" />
        <Text fontWeight="bold"
            placeholder='You will receive an order confirmation email from us with the subject "Thank you for your purchase at Brow Charm".' />
        <Text fontWeight="bold" placeholder='If you do not see it in your inbox, please check your spam folder.' />
        <Spacer />
        <NuxtImg src="/images/single.jpg" loading="eager" alt="thankyou" width="460px" />
        <Spacer />
        <TyDescriptionHeader />
    </section>
    <UpsellFooter />
</template>
<script lang="ts" setup>
import Spacer from '~/components/Spacer.vue';
import Text from '~/components/upsell/Text.vue';
import TyDescriptionHeader from '~/components/upsell/thankyou/TyDescriptionHeader.vue';
onMounted(async () => {
    await checkSteps();
    await fbCAPI('Upsell4cv');
    dataLayer('Upsell4cv');
    // Giving it delay to clean the storage as it needed for dataLayer and CAPI
    setTimeout(() => {
        storage.clearSession();
        storage.clearLocal();
    }, 1000)
})

</script>