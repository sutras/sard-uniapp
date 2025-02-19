<template>
  <sar-toast-agent />
  <sar-dialog-agent />
  <view :class="classNames(bem.b(), bem.m('emphasis', emphasis))">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { classNames } from 'sard-uniapp'

defineProps<{
  emphasis?: boolean
}>()

const bem = createBem('page')
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
