<template>
  <sar-signature color="red" @submit="onSubmit"></sar-signature>

  <image v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dataURL = ref('')

const onSubmit = (url: string) => {
  dataURL.value = url
}
</script>
