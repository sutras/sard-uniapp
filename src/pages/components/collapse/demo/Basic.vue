<template>
  <sar-button @click="visible = !visible" root-style="margin-bottom: 20rpx">
    {{ visible ? '折叠' : '展开' }}
  </sar-button>

  <sar-collapse :visible="visible">
    <view style="padding: 20rpx; background-color: var(--sar-tertiary-bg)">
      <view>collapse</view>
      <view>collapse</view>
      <view>collapse</view>
      <view>collapse</view>
      <view>collapse</view>
      <view>collapse</view>
    </view>
  </sar-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
