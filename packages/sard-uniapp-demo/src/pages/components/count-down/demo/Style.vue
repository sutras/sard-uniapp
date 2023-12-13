<template>
  <sar-count-down :time="1000 * 60 * 60 * 2" #default="{ time }">
    <view class="container">
      <view class="box">
        {{ String(time.hours).padStart(2, '0') }}
      </view>
      <view class="colon">:</view>
      <view class="box">
        {{ String(time.minutes).padStart(2, '0') }}
      </view>
      <view class="colon">:</view>
      <view class="box">
        {{ String(time.seconds).padStart(2, '0') }}
      </view>
    </view>
  </sar-count-down>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 60rpx;
  background-color: var(--sar-primary);
  color: #fff;
  border-radius: var(--sar-rounded);
}
.colon {
  margin: 0 10rpx;
}
</style>
