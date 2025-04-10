<template>
  <table class="bg-[#FFD439] text-xs">
    <tbody>
      <tr class="flex gap-2 p-2">
        <td>
          <NuxtImg id="pulse1" alt="left-arrow" src="/images/right.png" width="22" height="13"
            class="min-w-[30px] h-auto" />
        </td>
        <td class="pt-1">
          <input v-model="vipOptIn" @click="updateVipOptIn(false)" id="checkbox" type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer" />
        </td>
        <td>
          <div class="font-bold cursor-pointer" @click="updateVipOptIn(false)">
            Claim 10% OFF my order TODAY + Free S&H (Save $4.95) + VIP.
            This offer expires once you leave the page! I am 18 years
            or older and agree to the
            <strong><a href="https://policy.browcharm.co/browcharm/policies/terms.html" target="_blank"
                class="link">terms and conditions</a></strong>
            and
            <strong><a href="https://policy.browcharm.co/browcharm/policies/privacy.html" target="_blank"
                class="link">privacy policy</a></strong>.
            </div>
        </td>
        <td>
          <NuxtImg id="pulse1" alt="left-arrow" src="/images/left.png" width="22" height="13"
            class="min-w-[30px] h-auto" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useCheckoutStore } from "~/stores/checkoutStore";

const checkoutStore = useCheckoutStore();
const { updateVipOptIn } = checkoutStore;
// Access vipOptIn directly from the store
const vipOptIn = computed(() => checkoutStore.vipOptIn);

</script>
<style scoped>
.link {
  color: #0d6efd;
  text-decoration: underline;
}
</style>
