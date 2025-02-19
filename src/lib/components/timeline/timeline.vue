<template>
  <view :class="timelineClass" :style="timelineStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type TimelineProps, type TimelineSlots } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TimelineProps>(), {})

defineSlots<TimelineSlots>()

const bem = createBem('timeline')

// main

// others
const timelineClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const timelineStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
