<template>
  <sar-list card>
    <sar-list-item hover arrow title="自定义内容" @click="onCustomToast" />
    <sar-list-item hover arrow title="自定义图标" @click="onIconToast" />
  </sar-list>

  <sar-toast-agent id="custom-content">
    <view class="custom-content">
      <text>完全自定义的内容</text>
      <text>可以包含多个元素</text>
    </view>
  </sar-toast-agent>

  <sar-toast-agent id="custom-icon" title="自定义图标提示">
    <template #icon>
      <sar-icon name="star-fill" family="sari" />
    </template>
  </sar-toast-agent>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onCustomToast = () => {
  toast({
    id: 'custom-content',
  })
}

const onIconToast = () => {
  toast({
    id: 'custom-icon',
  })
}
</script>

<style scoped>
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  padding: 40rpx 60rpx;
}
</style>
