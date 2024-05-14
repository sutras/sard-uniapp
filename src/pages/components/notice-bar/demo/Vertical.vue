<template>
  <sar-notice-bar vertical>
    <swiper autoplay vertical :interval="1500" circular style="height: 80rpx">
      <swiper-item>
        <view class="swipe-item">1. 这是一条公告！</view>
      </swiper-item>
      <swiper-item>
        <view class="swipe-item">2. 这是一条公告！</view>
      </swiper-item>
      <swiper-item>
        <view class="swipe-item">3. 这是一条公告！</view>
      </swiper-item>
    </swiper>
  </sar-notice-bar>
</template>

<style lang="scss">
.swipe-item {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
