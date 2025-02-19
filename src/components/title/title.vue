<template>
  <view :class="bem.b()">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const bem = createBem('title')
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(title) {
  @include b() {
    margin-top: 60rpx;
    margin-bottom: 20rpx;
    font-size: var(--sar-text-base);
    color: var(--sar-tertiary-color);

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
