<template>
  <sar-swiper
    :list="list"
    :display-multiple-items="3"
    item-style="margin: 0 5px"
  ></sar-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat2.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat3.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat4.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat5.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat6.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat7.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat8.jpg',
])
</script>
