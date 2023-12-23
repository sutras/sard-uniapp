<template>
  <view class="stepped">
    <view class="stepped-color" style="background-color: var(--sar-white)" />
    <view
      v-for="i in 9"
      :key="i"
      class="stepped-color"
      :style="`background-color: var(--sar-gray-${100 * i})`"
    />
    <view class="stepped-color" style="background-color: var(--sar-black)" />
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.stepped {
  display: flex;
  flex-direction: row;
  margin-bottom: 20rpx;
  border: 1px solid var(--sar-border-color);
}

.stepped-color {
  flex: 1;
  height: 80rpx;
}
</style>
