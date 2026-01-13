<template>
  <sar-segmented v-model="src" :options="options" />

  <view style="height: 320rpx; margin-top: 20rpx">
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

const options = [
  { label: '销毁图片', value: '' },
  {
    label: '加载图片',
    value: 'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg',
  },
]
</script>
