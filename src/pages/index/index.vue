<template>
  <view :class="bem.e('header')">
    <view :class="bem.e('leading')">
      <image :class="bem.e('logo')" src="/static/logo.svg" />
      <text :class="bem.e('title')">{{ title }}</text>
    </view>
    <view :class="bem.e('desc')">
      {{ desc }}
    </view>
  </view>

  <view :class="bem.e('menu')">
    <doc-menu></doc-menu>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { ref } from 'vue'

const bem = createBem('index')

const title = ref('Sard Uniapp')
const desc = ref('Uniapp UI 组件库')
</script>

<style lang="scss">
@use '@/style/index.scss' as *;

@include bem(index) {
  @include e(header) {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    padding: 100rpx 64rpx 20rpx;
  }

  @include e(leading) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;
  }

  @include e(logo) {
    width: 64rpx;
    height: 64rpx;
  }

  @include e(title) {
    font-size: 44rpx;
    font-weight: bold;
  }

  @include e(desc) {
    font-size: 28rpx;
    color: var(--sar-tertiary-color);
  }

  @include e(menu) {
    margin-left: 32rpx;
    margin-right: 32rpx;
    padding-bottom: 60rpx;
  }
}
</style>
