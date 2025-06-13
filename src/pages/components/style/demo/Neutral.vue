<template>
  <view class="box">
    <view class="color-box" style="background-color: var(--sar-body-bg)">
      body-bg
    </view>
    <view class="color-box" style="color: var(--sar-body-color)">
      body-color
    </view>
    <view class="color-box" style="background-color: var(--sar-secondary-bg)">
      secondary-bg
    </view>
    <view class="color-box" style="color: var(--sar-secondary-color)">
      secondary-color
    </view>
    <view class="color-box" style="background-color: var(--sar-tertiary-bg)">
      tertiary-bg
    </view>
    <view class="color-box" style="color: var(--sar-tertiary-color)">
      tertiary-color
    </view>
    <view class="color-box" style="background-color: var(--sar-fourth-bg)">
      fourth-bg
    </view>
    <view class="color-box" style="color: var(--sar-fourth-color)">
      fourth-color
    </view>
    <view class="color-box" style="background-color: var(--sar-emphasis-bg)">
      emphasis-bg
    </view>
    <view class="color-box" style="color: var(--sar-emphasis-color)">
      emphasis-color
    </view>
    <view class="color-box" style="background-color: var(--sar-active-bg)">
      active-bg
    </view>
    <view class="color-box" style="background-color: var(--sar-active-deep-bg)">
      active-deep-bg
    </view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20rpx;
}
.color-box {
  display: flex;
  flex: 1;
  flex-basis: 34%;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  border: 1px solid var(--sar-border-color);
}
</style>
