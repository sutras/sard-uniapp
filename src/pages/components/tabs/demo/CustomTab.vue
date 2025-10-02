<template>
  <sar-tabs v-model:current="current" style="--sar-tabs-line-bg: transparent">
    <sar-tab name="0">
      <sar-icon name="star" />
      <view style="margin-left: 8rpx">标签0</view>
    </sar-tab>
    <sar-tab name="1">
      <view>标签1</view>
      <sar-badge value="5" />
    </sar-tab>
    <sar-tab name="2" title="标签2"></sar-tab>

    <template #line>
      <sar-icon
        family="demo-icons"
        name="smile-line"
        color="var(--sar-danger)"
        size="40rpx"
      />
    </template>
  </sar-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref('0')
</script>
