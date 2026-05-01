<template>
  <sar-swiper :list="list"></sar-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
])
</script>
