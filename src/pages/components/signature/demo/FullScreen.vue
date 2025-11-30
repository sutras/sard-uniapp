<template>
  <sar-button @click="visible = true">签名</sar-button>

  <sar-signature
    v-model:visible="visible"
    full-screen
    custom-navbar
    @confirm="onConfirm"
  >
    <view style="color: var(--sar-tertiary-color)">
      请在上面空白处手写您的签名
    </view>
  </sar-signature>

  <image v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}

const visible = ref(false)
</script>
