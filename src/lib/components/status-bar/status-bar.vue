<template>
  <view :class="statusBarClass" :style="statusBarStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type StatusBarProps,
  type StatusBarSlots,
  type StatusBarEmits,
  type StatusBarExpose,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StatusBarProps>(), {})

defineSlots<StatusBarSlots>()

defineEmits<StatusBarEmits>()

const bem = createBem('statusBar')

// main
const statusBarHeight = computed(() => {
  return props.height || uni.getSystemInfoSync().statusBarHeight + 'px'
})

defineExpose<StatusBarExpose>()

// others
const statusBarClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const statusBarStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    height: statusBarHeight.value,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
