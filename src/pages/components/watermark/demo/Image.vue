<template>
  <view style="position: relative; height: 240px">
    <sar-watermark :image="image" :width="126" :height="36" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const image = ref('/static/logo-name.png')

// #ifndef H5
image.value =
  'https://sard.wzt.zone/sard-uniapp-docs/mobile/static/logo-name.png'
// #endif
</script>
