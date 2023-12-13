<template>
  <sar-toast-agent />
  <view :class="classNames(bem.b(), bem.m('emphasis', emphasis))">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { classNames } from '@sard/uniapp'

defineProps<{
  emphasis?: boolean
}>()

const bem = createBem('page')
</script>

<style lang="scss">
@use '@/index.scss' as *;

@include bem(page) {
  @include b() {
    padding: 10px 0;
  }

  @include m(emphasis) {
    background-color: var(--sar-emphasis-bg);
  }
}
</style>
