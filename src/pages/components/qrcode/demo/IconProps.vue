<template>
  <sar-qrcode
    text="https://sard.wzt.zone/sard-uniapp-docs/mobile/"
    :icon="icon"
    show-menu-by-longpress
  ></sar-qrcode>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// h5 默认加载本地, 方便调试
const icon = ref('/static/logo.png')

// #ifndef H5
// 非 h5 加载线上, 小程序需要将域名加入白名单
icon.value = 'https://sard.wzt.zone/sard-uniapp-docs/mobile/static/logo.png'
// #endif
</script>

<style lang="scss" scoped></style>
