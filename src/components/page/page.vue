<template>
  <sar-toast-agent />
  <sar-dialog-agent />
  <sar-notify-agent status-bar />

  <view
    :class="classNames(bem.b(), bem.m('emphasis', emphasis))"
    :style="{ padding: padding || '' }"
  >
    <sar-navbar
      :title="title"
      show-back
      fixed
      :flow="isAlipay"
      status-bar
      :root-style="{
        '--sar-navbar-bg': navbarBg || 'var(--sar-body-bg)',
        '--sar-navbar-item-color': 'var(--sar-body-color)',
      }"
      @back="onBack"
    />

    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { classNames, isAlipay } from 'sard-uniapp'

defineProps<{
  emphasis?: boolean
  title?: string
  navbarBg?: string
  padding?: string
}>()

const bem = createBem('page')

const onBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(page) {
  @include b() {
    padding: 20rpx 0 calc(20rpx + env(safe-area-inset-bottom));
  }

  @include m(emphasis) {
    background-color: var(--sar-emphasis-bg);
  }
}
</style>
