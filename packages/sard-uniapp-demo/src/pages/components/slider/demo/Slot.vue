<template>
  <doc-title>单值选择</doc-title>
  <sar-slider :model-value="50">
    <template #endThumb="{ value }">
      <view class="slider-thumb">{{ value }}</view>
    </template>
  </sar-slider>

  <doc-title>范围选择</doc-title>
  <sar-slider range :model-value="[20, 80]">
    <template #startThumb="{ value }">
      <view class="slider-thumb">{{ value }}</view>
    </template>
    <template #endThumb="{ value }">
      <view class="slider-thumb">{{ value }}</view>
    </template>
  </sar-slider>
</template>

<style lang="scss" scoped>
.slider-thumb {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 48rpx;
  border-radius: var(--sar-rounded-sm);
  font-size: var(--sar-text-base);
  color: #fff;
  background-color: var(--sar-orange);
  box-shadow: var(--sar-shadow);
}
</style>
