<template>
  <doc-title>单滑块</doc-title>
  <sar-slider :model-value="40" show-scale :step="20" />

  <doc-title>双滑块</doc-title>
  <sar-slider range :model-value="[20, 80]" show-scale :step="20" />

  <doc-title>刻度显示在上面</doc-title>
  <sar-slider :model-value="40" show-scale scale-position="top" :step="20" />

  <doc-title>垂直刻度</doc-title>
  <view style="display: flex; flex-direction: row">
    <view>
      <doc-title>单滑块</doc-title>
      <sar-slider :model-value="25" vertical show-scale :step="25" />
    </view>

    <view style="margin-left: 100rpx">
      <doc-title>双滑块</doc-title>
      <sar-slider
        range
        :model-value="[25, 75]"
        vertical
        show-scale
        :step="25"
      />
    </view>

    <view style="margin-left: 100rpx">
      <doc-title>刻度显示在右边</doc-title>
      <sar-slider
        :model-value="25"
        vertical
        show-scale
        scale-position="right"
        :step="25"
      />
    </view>
  </view>
</template>
