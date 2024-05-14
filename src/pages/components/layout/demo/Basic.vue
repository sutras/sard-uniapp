<template>
  <sar-row>
    <sar-col>
      <view class="layout-box">span</view>
    </sar-col>
    <sar-col>
      <view class="layout-box">span</view>
    </sar-col>
  </sar-row>

  <sar-row>
    <sar-col :span="4">
      <view class="layout-box">span-4</view>
    </sar-col>
    <sar-col :span="8">
      <view class="layout-box">span-8</view>
    </sar-col>
  </sar-row>

  <sar-row>
    <sar-col :span="3">
      <view class="layout-box">span-3</view>
    </sar-col>
    <sar-col>
      <view class="layout-box">span</view>
    </sar-col>
    <sar-col span="auto">
      <view class="layout-box">auto</view>
    </sar-col>
  </sar-row>
</template>
