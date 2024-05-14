<template>
  <view style="display: flex; flex-direction: row">
    <view>
      <doc-title>单值选择</doc-title>
      <sar-slider :model-value="50" vertical show-value />
    </view>

    <view style="margin-left: 100rpx">
      <doc-title>范围选择</doc-title>
      <sar-slider range :model-value="[20, 80]" vertical show-value />
    </view>
  </view>
</template>
