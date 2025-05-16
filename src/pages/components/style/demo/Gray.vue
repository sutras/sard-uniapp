<template>
  <view class="stepped">
    <view
      class="stepped-color"
      style="background-color: var(--sar-white); color: var(--sar-black)"
    >
      var(--sar-white)
    </view>
    <view
      v-for="i in 9"
      :key="i"
      class="stepped-color"
      :style="`background-color: var(--sar-gray-${100 * i}); color: ${
        i < 6 ? 'var(--sar-black)' : 'var(--sar-white)'
      }`"
    >
      {{ `var(--sar-gray-${100 * i})` }}
    </view>
    <view class="stepped-color" style="background-color: var(--sar-black)">
      var(--sar-black)
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.stepped {
  display: flex;
  flex-direction: column;
  margin-bottom: 20rpx;
}

.stepped-color {
  padding: 16rpx;
  margin-bottom: 1px;
  color: var(--sar-white);
}
</style>
