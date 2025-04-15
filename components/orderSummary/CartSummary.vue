<template>
  <tbody>
    <tr v-for="(label, index) in summaryItems" :key="index">
      <td class="px-0 text-sm font-regular">{{ label.name }}</td>
      <td class="px-4"></td>
      <td class="text-sm font-regular text-right pr-4">
        <template v-if="!loading">
          <template v-if="label.loading">
            <LoadingSpinner />
          </template>
          <template v-else>
            <template v-if="label.name === 'Discount'">
              <div class="text-nowrap">
                - {{ label.value }}
              </div>
            </template>
            <template v-else>
              <template v-if="typeof (label.value) === 'string'">
                {{ label.value }}
              </template>
              <template v-else>
                {{ label.value }}
              </template>
            </template>
          </template>
        </template>
        <template v-else>
          <LoadingSpinner />
        </template>
      </td>
    </tr>
  </tbody>
</template>



<script setup lang="ts">
defineProps<{
  summaryItems: Array<{
    name: string;
    value: number; // Optional to handle cases where value might not be present
    loading?: boolean; // Optional to handle cases where loading status might be present
  }>;
  loading: boolean;
}>();
</script>
<style scoped>
tr:last-child {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}

.text-sm {
  font-size: 0.875rem !important;
  line-height: 1.25rem;
}

td {
  font-size: inherit !important;
  /* Ensures td inherits tr's font-size */
}
</style>
