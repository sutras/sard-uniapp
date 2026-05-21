<template>
  <sar-list card>
    <sar-list-item hover arrow title="默认id的Popup" @click="onShowPopup1" />
    <sar-list-item hover arrow title="自定义id的Popup" @click="onShowPopup2" />
    <sar-list-item hover arrow title="隐藏指定Popup" @click="onHidePopup" />
    <sar-list-item hover arrow title="隐藏所有Popup" @click="onHideAll" />
  </sar-list>

  <sar-popup-agent id="default-popup">
    <view class="popup-content">
      <text class="popup-title">默认id的弹出层</text>
      <text class="popup-desc">这是弹出层的内容</text>
      <sar-button @click="onCloseDefaultPopup">关闭</sar-button>
    </view>
  </sar-popup-agent>

  <sar-popup-agent id="custom-popup" effect="slide-bottom">
    <view class="popup-content">
      <text class="popup-title">自定义id的弹出层</text>
      <text class="popup-desc">从底部滑出的弹出层</text>
      <sar-button @click="onCloseCustomPopup">关闭</sar-button>
    </view>
  </sar-popup-agent>
</template>

<script setup lang="ts">
import { popup } from 'sard-uniapp'

const onShowPopup1 = () => {
  popup({
    visible: true,
  })
}

const onShowPopup2 = () => {
  popup({
    id: 'custom-popup',
    visible: true,
    effect: 'slide-bottom',
  })
}

const onHidePopup = () => {
  popup.hide('custom-popup')
}

const onHideAll = () => {
  popup.hideAll()
}

const onCloseDefaultPopup = () => {
  popup.hide('default-popup')
}

const onCloseCustomPopup = () => {
  popup.hide('custom-popup')
}
</script>

<style lang="scss" scoped>
.popup-content {
  width: 400rpx;
  padding: 60rpx 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

.popup-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.popup-desc {
  font-size: 28rpx;
  color: #999;
}
</style>
