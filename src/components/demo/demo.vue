<template>
  <view :class="bem.b()">
    <view v-if="$slots.title || title" :class="bem.e('title')">
      {{ title }}
    </view>
    <view :class="classNames(bem.e('body'), bem.em('body', 'full', full))">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { classNames } from 'sard-uniapp'
import { createBem } from '@/utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

withDefaults(
  defineProps<{
    title?: string
    full?: boolean
  }>(),
  {
    full: false,
  },
)

const bem = createBem('demo')
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(demo) {
  @include b() {
    margin-bottom: 80rpx;
  }

  @include e(title) {
    margin-bottom: 30rpx;
    margin-left: 32rpx;
    border-left: 8rpx solid var(--sar-primary);
    padding-left: 16rpx;
    font-size: var(--sar-text-base);
    font-weight: bold;
    line-height: var(--sar-leading-tight);
  }

  @include e(body) {
    padding: 0 32rpx;

    @include m(full) {
      padding-left: 0;
      padding-right: 0;
    }

    @include e(title) {
      margin-top: 80rpx;
    }
  }
}
</style>
