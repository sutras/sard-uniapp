<template>
  <sar-floating-bubble v-model:offset="offset" axis="both">
    <sar-icon family="demo-icons" name="chat-dots" size="48rpx" />
  </sar-floating-bubble>

  <view style="margin-top: 100rpx; text-align: center">
    <text>x: {{ offset.x.toFixed(0) }}</text>
    <text style="margin-left: 20rpx">y: {{ offset.y.toFixed(0) }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const offset = ref({
  x: 200,
  y: 300,
})
</script>
