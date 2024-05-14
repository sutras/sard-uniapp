<template>
  <sar-tabs v-model:current="current" :list="list" scrollable></sar-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabOption } from 'sard-uniapp'

const current = ref(6)
const list = ref<TabOption[]>(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        title: `标签${i}`,
      }
    }),
)
</script>
