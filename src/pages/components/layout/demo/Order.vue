<template>
  <sar-row>
    <sar-col>
      <view class="layout-box">col1</view>
    </sar-col>
    <sar-col :order="-1">
      <view class="layout-box">col2 order:-1</view>
    </sar-col>
  </sar-row>

  <sar-row>
    <sar-col :order="2">
      <view class="layout-box">col1 order:2</view>
    </sar-col>
    <sar-col :order="1">
      <view class="layout-box">col2 order:1</view>
    </sar-col>
    <sar-col>
      <view class="layout-box">col3</view>
    </sar-col>
  </sar-row>
</template>
