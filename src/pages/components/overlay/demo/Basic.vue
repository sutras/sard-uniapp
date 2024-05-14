<template>
  <sar-overlay :visible="visible" @click="visible = false"></sar-overlay>

  <sar-button @click="visible = true">显示遮罩</sar-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
