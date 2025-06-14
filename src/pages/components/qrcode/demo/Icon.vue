<template>
  <sar-qrcode text="https://sard.wzt.zone/sard-uniapp-docs/mobile/">
    <view class="icon">
      <sar-icon name="/static/logo.svg" size="64rpx" />
    </view>
  </sar-qrcode>
</template>

<style lang="scss" scoped>
.icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8rpx;
}
</style>
