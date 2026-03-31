<template>
  <sar-list card>
    <sar-list-item class="px-0 py-20">
      <sar-color-picker v-model="color" />
    </sar-list-item>
    <sar-list-item>当前颜色：{{ color }}</sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#1989FA')
</script>
