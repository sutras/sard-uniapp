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

withDefaults(
  defineProps<{
    title?: string
    full?: boolean
  }>(),
  {
    full: false,
  },
)

const bem = createBem('badge-box')
</script>

<style lang="scss">
@use '@/index.scss' as *;

@include bem(badge-box) {
  @include b() {
    position: relative;
    width: 96rpx;
    height: 96rpx;
    border-radius: var(--sar-rounded);
    background-color: var(--sar-tertiary-bg);
  }
}
</style>
