<template>
  <view class="main-color" :style="`background-color: var(--sar-${color})`">
    {{ color }}
  </view>
  <view class="stepped">
    <view
      v-for="i in 10"
      :key="i"
      class="stepped-color"
      :style="`background-color: rgba(var(--sar-${color}-rgb), ${
        0.1 * (11 - i)
      })`"
    ></view>
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
  height: 80rpx;
  margin-top: 20rpx;
  padding: 0 32rpx;
  color: var(--sar-white);
}

.stepped {
  display: flex;
  flex-direction: row;
}

.stepped-color {
  flex: 1;
  height: 80rpx;
}
</style>
