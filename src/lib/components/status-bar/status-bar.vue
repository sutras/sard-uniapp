<template>
  <view :class="statusBarClass" :style="statusBarStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getWindowInfo,
} from '../../utils'
import {
  type StatusBarProps,
  type StatusBarSlots,
  type StatusBarEmits,
  type StatusBarExpose,
  defaultStatusBarProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StatusBarProps>(), defaultStatusBarProps)

defineSlots<StatusBarSlots>()

defineEmits<StatusBarEmits>()

const bem = createBem('status-bar')

// main
const statusBarHeight = computed(() => {
  return props.height || getWindowInfo().statusBarHeight + 'px'
})

defineExpose<StatusBarExpose>()

// others
const statusBarClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const statusBarStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    [props.reverse ? 'width' : 'height']: statusBarHeight.value,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
