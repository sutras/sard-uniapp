<template>
  <sar-qrcode
    text="https://sard.wzt.zone/sard-uniapp-docs/mobile/"
    :icon="icon"
    show-menu-by-longpress
  ></sar-qrcode>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const icon = ref('/static/logo.png')

// #ifndef H5
icon.value = 'https://sard.wzt.zone/sard-uniapp-docs/mobile/static/logo.png'
// #endif
</script>
