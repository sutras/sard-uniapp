<template>
  <sar-qrcode
    text="https://sard-uniapp.wzt.zone/mobile/"
    :icon="icon"
    show-menu-by-longpress
  ></sar-qrcode>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const icon = ref('/static/logo.png')

// #ifndef H5
icon.value = 'https://sard-uniapp.wzt.zone/mobile/static/logo.png'
// #endif
</script>
