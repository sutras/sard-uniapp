<template>
  <sar-tabbar v-model:current="current">
    <sar-tabbar-item
      :name="0"
      icon="house-door-fill"
      icon-family="demo-icons"
      text="首页"
    />
    <sar-tabbar-item
      :name="1"
      icon="cart-fill"
      icon-family="demo-icons"
      text="购物车"
    />
    <sar-tabbar-item @click="toast('点击了添加按钮')">
      <view class="bulge">
        <view class="cover"></view>
        <view class="button">
          <sar-icon name="plus" size="96rpx" />
        </view>
      </view>
      <text class="text">添加</text>
    </sar-tabbar-item>
    <sar-tabbar-item
      :name="2"
      icon="chat-dots-fill"
      icon-family="demo-icons"
      text="消息"
    />
    <sar-tabbar-item
      :name="3"
      icon="person-fill"
      icon-family="demo-icons"
      text="我的"
    />
  </sar-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from '@sard/uniapp'

const current = ref(0)
</script>

<style lang="scss" scoped>
.bulge {
  position: absolute;
  top: 0;
  transform-origin: top center;
  transform: scale(0.5) translateY(-33%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 192rpx;
  height: 192rpx;
  border-radius: 50%;
  background-color: var(--sar-tabbar-bg);
  box-shadow: inset 0 0 0 1px var(--sar-border-color);

  &:active {
    opacity: 0.8;
  }
}

.cover {
  position: absolute;
  top: 33%;
  width: 100%;
  height: 70%;
  transform: translateY(1px);
  background-color: var(--sar-tabbar-bg);
}

.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152rpx;
  height: 152rpx;
  border-radius: 50%;
  background-color: var(--sar-primary);
  color: var(--sar-white);
}

.text {
  position: relative;
  margin-top: auto;
  margin-bottom: 10rpx;
}
</style>
