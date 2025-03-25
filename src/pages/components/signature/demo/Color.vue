<template>
  <sar-signature color="red" @confirm="onConfirm"></sar-signature>

  <image v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}
</script>
