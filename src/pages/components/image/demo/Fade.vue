<template>
  <sar-button class="mb-10" @click="loadImage">点击加载图片</sar-button>

  <view style="height: 320rpx">
    <sar-image v-if="src" :src="src" width="320rpx" height="320rpx"></sar-image>

    <sar-image
      v-if="src"
      :src="src"
      width="320rpx"
      height="320rpx"
      class="ml-10"
      :fade="false"
    ></sar-image>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const src = ref('')

const loadImage = () => {
  src.value = 'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg'
}
</script>
