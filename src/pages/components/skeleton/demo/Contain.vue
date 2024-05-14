<template>
  <sar-switch v-model="loading" root-style="margin-bottom: 20rpx;" />

  <sar-skeleton avatar title animated :loading="loading">
    <view style="display: flex; gap: 30rpx">
      <sar-icon name="person" size="64rpx" />
      <view style="flex: 1">
        <view style="font-size: var(--sar-text-lg); margin-bottom: 20rpx">
          我是一个标题
        </view>
        <view>
          我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
        </view>
      </view>
    </view>
  </sar-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>
