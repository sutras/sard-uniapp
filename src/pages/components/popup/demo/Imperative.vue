<template>
  <sar-list card>
    <sar-list-item hover arrow title="显示弹窗1" @click="onShowPopup1" />
    <sar-list-item hover arrow title="显示弹窗2" @click="onShowPopup2" />
  </sar-list>

  <sar-popup-agent id="custom-popup1" effect="zoom">
    <view class="popup-content-center">
      <text class="popup-title">弹窗1标题</text>
      <text class="popup-desc">弹窗1内容</text>
      <view class="flex gap-20">
        <sar-button type="pale-text" @click="onShowPopup2">
          显示弹窗2
        </sar-button>
        <sar-button type="pale-text" @click="onCloseDefaultPopup">
          关闭
        </sar-button>
      </view>
    </view>
  </sar-popup-agent>

  <sar-popup-agent id="custom-popup2" effect="slide-bottom">
    <view class="popup-content-bottom">
      <text class="popup-title">弹窗2标题</text>
      <text class="popup-desc">弹窗2内容</text>
      <view class="flex gap-20">
        <sar-button type="pale-text" @click="onCloseCustomPopup">
          关闭
        </sar-button>
        <sar-button type="pale-text" @click="onHideAll">关闭所有</sar-button>
      </view>
    </view>
  </sar-popup-agent>
</template>

<script setup lang="ts">
import { popup } from 'sard-uniapp'

const onShowPopup1 = () => {
  popup({
    id: 'custom-popup1',
  })
}

const onShowPopup2 = () => {
  popup({
    id: 'custom-popup2',
    effect: 'slide-bottom',
  })
}

const onHideAll = () => {
  popup.hideAll()
}

const onCloseDefaultPopup = () => {
  popup.hide('custom-popup1')
}

const onCloseCustomPopup = () => {
  popup.hide('custom-popup2')
}
</script>

<style lang="scss" scoped>
.popup-content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440rpx;
  max-width: 100%;
  padding: var(--sar-dialog-body-padding-y) var(--sar-dialog-body-padding-x);
  background: var(--sar-dialog-bg);
  border-radius: var(--sar-dialog-border-radius);
}

.popup-content-bottom {
  display: flex;
  flex-direction: column;
  padding: 60rpx 40rpx;
  border-top-left-radius: var(--sar-popout-border-top-radius);
  border-top-right-radius: var(--sar-popout-border-top-radius);
  background: var(--sar-popout-bg);
}

.popup-title {
  font-size: var(--sar-dialog-title-font-size);
  font-weight: var(--sar-font-bold);
  text-align: center;
}

.popup-desc {
  margin: 20rpx 0;
  font-size: var(--sar-dialog-message-font-size);
  text-align: center;
  color: var(--sar-dialog-message-color);
}
</style>
