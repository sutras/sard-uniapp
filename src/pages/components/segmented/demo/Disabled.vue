<template>
  <sar-space direction="vertical">
    <sar-segmented v-model="value" :options="options" disabled />
    <sar-segmented v-model="value" :options="options" />
  </sar-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly', disabled: true },
  { label: 'Monthly', value: 'Monthly' },
]

const value = ref('Daily')
</script>
