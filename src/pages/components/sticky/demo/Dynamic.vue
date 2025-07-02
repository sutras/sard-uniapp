<template>
  <view style="margin-left: 120rpx">
    <sar-button inline @click="visible = true">点击生成</sar-button>
    <sar-sticky :offset-top="safeAreaTop" style="margin-top: 20rpx">
      <sar-button v-if="visible" inline theme="success">动态生成</sar-button>
    </sar-sticky>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { safeAreaTop } from '@/utils'

const visible = ref(false)
</script>
