<template>
  <view class="main-color" :style="`background-color: var(--sar-${color})`">
    {{ `var(--sar-${color})` }}
  </view>
  <view class="stepped">
    <view
      v-for="i in 10"
      :key="i"
      class="stepped-color"
      :style="`background-color: rgba(var(--sar-${color}-rgb), ${
        0.1 * (11 - i)
      })`"
    >
      {{ `rgba(var(--sar-${color}-rgb), ${(0.1 * (11 - i)).toFixed(1)})` }}
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<style lang="scss" scoped>
.main-color {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 1px;
  padding: 16rpx;
}

.stepped {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stepped-color {
  padding: 16rpx;
}
</style>
