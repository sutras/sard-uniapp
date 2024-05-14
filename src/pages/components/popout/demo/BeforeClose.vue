<template>
  <sar-list card>
    <sar-list-item hover arrow title="弹出框" @click="visible = true" />
  </sar-list>

  <sar-popout
    title="标题"
    v-model:visible="visible"
    :before-close="beforeClose"
  >
    <view style="padding-left: 32rpx; padding-right: 32rpx">
      <view>弹出框内容</view>
      <view>弹出框内容</view>
      <view>弹出框内容</view>
    </view>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const beforeClose = (type: 'confirm' | 'cancel' | 'close') => {
  if (type === 'confirm') {
    return new Promise((resolve) => setTimeout(resolve, 1500))
  }
}
</script>
