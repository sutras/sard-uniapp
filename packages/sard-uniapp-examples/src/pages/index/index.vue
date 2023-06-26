<template>
  <view class="content">
    <view class="header">
      <view>
        <view class="flex-row">
          <image class="logo" src="/static/logo.svg" />
          <text class="title">{{ title }}</text>
        </view>
        <view class="desc">
          <text>{{ desc }}</text>
        </view>
      </view>
    </view>

    <doc-menu></doc-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Sard uniapp')
const desc = ref('uniapp UI 组件库')
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100rpx 40rpx 40rpx;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  width: 32px;
  height: 32px;
}

.title {
  margin-left: 10px;
  font-size: 20px;
}

.desc {
  margin-top: 10px;
  font-size: 17px;
  color: var(--sar-tertiary-color);
}
</style>
