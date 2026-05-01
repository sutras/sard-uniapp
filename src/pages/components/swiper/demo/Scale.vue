<template>
  <sar-swiper
    :list="list"
    previous-margin="120rpx"
    next-margin="120rpx"
    :dynamic-item-style="dynamicItemStyle"
  ></sar-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicItemStyle = (index: number, activeIndex: number) => {
  return {
    transform: index === activeIndex ? 'scale(1)' : 'scale(0.8)',
    transition: 'transform 0.3s',
    borderRadius: '16rpx',
    overflow: 'hidden',
  }
}

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
