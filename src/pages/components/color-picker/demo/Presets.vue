<template>
  <sar-list card>
    <sar-list-item class="px-0 py-20">
      <sar-color-picker v-model="color" :presets="presets" />
    </sar-list-item>
    <sar-list-item>当前颜色：{{ color }}</sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const presets = ['#1989FA', '#2ECC71', '#F59E0B', '#EF4444', '#8B5CF6']
const color = ref('#2ECC71')
</script>
