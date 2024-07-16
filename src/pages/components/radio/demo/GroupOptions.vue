<template>
  <sar-radio-group v-model="value" :options="options"></sar-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option2')

const options = Array(3)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })
</script>
