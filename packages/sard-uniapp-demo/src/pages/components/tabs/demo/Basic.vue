<template>
  <sar-tabs v-model:current="current" :list="list"></sar-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabOption } from '@sard/uniapp'

const current = ref(0)
const list = ref<TabOption[]>([
  {
    title: '标签0',
  },
  {
    title: '标签1',
  },
  {
    title: '标签2',
  },
])
</script>
