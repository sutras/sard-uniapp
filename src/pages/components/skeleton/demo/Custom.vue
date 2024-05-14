<template>
  <sar-row gap="20rpx" root-style="row-gap: 30rpx">
    <sar-col v-for="i in 8" :key="i" :span="3">
      <view
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 16rpx;
        "
      >
        <sar-skeleton-block height="120rpx" animated />
        <sar-skeleton-block animated />
      </view>
    </sar-col>
  </sar-row>

  <view style="display: flex; gap: 40rpx; margin-top: 60rpx">
    <sar-skeleton-block width="100px" height="80px" animated />
    <view style="display: flex; flex-direction: column; flex: 1">
      <sar-skeleton-paragraph :rows="2" animated />
      <sar-skeleton-block
        width="120rpx"
        height="60rpx"
        root-style="margin-left: auto; margin-top: auto"
        animated
      />
    </view>
  </view>
</template>
