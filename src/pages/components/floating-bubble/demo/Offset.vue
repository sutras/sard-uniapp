<template>
  <sar-floating-bubble
    v-model:offset="offset"
    axis="both"
    :navbar-height="navbarHeight"
  >
    <sar-icon family="demo-icons" name="chat-dots" size="48rpx" />
  </sar-floating-bubble>

  <view class="mt-100 text-center">
    <text>x: {{ offset.x.toFixed(0) }}</text>
    <text class="ml-20">y: {{ offset.y.toFixed(0) }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const navbarHeight = uni.upx2px(88)

const offset = ref({
  x: 200,
  y: 300,
})
</script>
