<template>
  <view :class="tabbarPitClass" :style="tabbarPitStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type TabbarPitProps,
  type TabbarPitSlots,
  type TabbarPitEmits,
  type TabbarPitExpose,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TabbarPitProps>(), {})

defineSlots<TabbarPitSlots>()

defineEmits<TabbarPitEmits>()

const bem = createBem('tabbar-pit')

// main

defineExpose<TabbarPitExpose>({})

// others
const tabbarPitClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('safe', props.safeAreaInsetBottom),
    props.rootClass,
  )
})

const tabbarPitStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
