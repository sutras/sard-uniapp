<template>
  <sar-list card>
    <sar-list-item class="px-0 py-20">
      <sar-color-picker v-model="color" show-alpha />
    </sar-list-item>
    <sar-list-item>当前颜色：{{ color }}</sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('rgba(25, 137, 250, 0.6)')
</script>
