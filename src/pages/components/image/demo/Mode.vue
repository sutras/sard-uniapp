<template>
  <sar-grid :columns="2" gap="20rpx">
    <sar-grid-item v-for="mode in modes" :key="mode">
      <view class="image-title">{{ mode }}</view>
      <sar-image
        class="image"
        src="https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger5.jpg"
        width="240rpx"
        height="240rpx"
        :mode="mode"
      ></sar-image>
    </sar-grid-item>
  </sar-grid>
</template>

<script setup lang="ts">
import { ImageProps } from 'sard-uniapp'

const modes: ImageProps['mode'][] = [
  'aspectFit',
  'aspectFill',
  'scaleToFill',
  'widthFix',
  'heightFix',
  'top',
  'bottom',
  'left',
  'right',
  'center',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
]
</script>

<style lang="scss" scoped>
.image-title {
  font-size: var(--sar-text-sm);
  margin-bottom: 8rpx;
}
.image {
  border: 1px solid var(--sar-border-color);
}
</style>
