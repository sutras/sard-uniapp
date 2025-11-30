<template>
  <sar-signature @confirm="onConfirm" target="filePath"></sar-signature>

  <image v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}
</script>
