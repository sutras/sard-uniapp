<template>
  <sar-swiper :list="list" dot-type="dot"></sar-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
  {
    video: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
    poster: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
  },
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
  },
])
</script>
