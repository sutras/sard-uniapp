<template>
  <sar-toast-agent />
  <sar-dialog-agent />
  <sar-notify-agent status-bar />
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
  ></sar-navbar>

  <!-- <template #left>
      <sar-tabs v-model:current="locale" type="card" style="align-self: center">
        <sar-tab name="zhCN">中文</sar-tab>
        <sar-tab name="enUS">英文</sar-tab>
      </sar-tabs>
    </template> -->

  <view
    :class="classNames(bem.b(), bem.m('emphasis', emphasis))"
    :style="{
      padding: padding || '',
      height: height || '',
      paddingBottom: paddingBottom || '',
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { classNames, isAlipay, useLocale } from 'sard-uniapp'

defineProps<{
  emphasis?: boolean
  title?: string
  navbarBg?: string
  padding?: string
  paddingBottom?: string
  height?: string
}>()

const bem = createBem('page')

const locale = useLocale()!

void locale

const onBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(page) {
  @include b() {
    box-sizing: border-box;
    padding: 20rpx 0 calc(20rpx + env(safe-area-inset-bottom));
    min-height: calc(100vh - var(--sar-navbar-height));
  }

  @include m(emphasis) {
    background-color: var(--sar-emphasis-bg);
  }
}
</style>
