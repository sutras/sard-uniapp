<template>
  <view :class="progressCircleClass" :style="progressCircleStyle">
    <view :class="trackClass" :style="trackStyle">
      <view :class="pieceClass" :style="pieceStyle">
        <view :class="capStartClass" :style="capStartStyle" />
        <view :class="capEndClass" :style="capEndStyle" />
      </view>
    </view>
    <slot>
      <view v-if="!status" :class="bem.e('text')">{{ percent }}%</view>
      <view v-if="status" :class="bem.e('status')">
        <sar-icon :name="iconName" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type ProgressCircleProps,
  type ProgressCircleSlots,
  defaultProgressCircle,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ProgressCircleProps>(),
  defaultProgressCircle,
)

defineSlots<ProgressCircleSlots>()

const bem = createBem('progress-circle')

// main
const iconName = computed(() => {
  if (!props.status) {
    return ''
  }
  return {
    success: 'check-circle-fill',
    warning: 'warning-fill',
    error: 'x-circle-fill',
  }[props.status]
})

const radius = computed(() => {
  return 50 - props.thickness / 2
})

const angle = computed(() => {
  return (props.percent / 100) * 360
})

const radian = computed(() => {
  return (angle.value / 180) * Math.PI
})

// others
const mask = computed(() => {
  return (
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e` +
    `%3ccircle stroke='black' fill='none' ` +
    `stroke-width='${props.thickness}' cx='50' cy='50' ` +
    `r='${radius.value}' /%3e%3c/svg%3e")`
  )
})

const progressCircleClass = computed(() => {
  return classNames(bem.b(), bem.m(props.status, props.status), props.rootClass)
})

const progressCircleStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.size,
      height: props.size,
    },
    props.rootStyle,
  )
})

const trackClass = computed(() => {
  return classNames(bem.e('track'))
})

const trackStyle = computed(() => {
  return stringifyStyle({
    backgroundColor: props.trackColor,
    '-webkit-mask': mask.value,
    mask: mask.value,
  })
})

const pieceClass = computed(() => {
  return classNames(bem.e('piece'))
})

const pieceStyle = computed(() => {
  return stringifyStyle({
    color: props.color,
    backgroundImage: `conic-gradient(currentColor ${angle.value}deg, transparent 0)`,
  })
})

const capStartClass = computed(() => {
  return classNames(bem.e('cap'), bem.e('cap-start'))
})

const capStartStyle = computed(() => {
  return stringifyStyle({
    width: props.thickness + '%',
    height: props.thickness + '%',
  })
})

const capEndClass = computed(() => {
  return classNames(bem.e('cap'), bem.e('cap-end'))
})

const capEndStyle = computed(() => {
  return stringifyStyle({
    width: props.thickness + '%',
    height: props.thickness + '%',
    left: 50 + Math.sin(radian.value) * radius.value + '%',
    top: 50 - Math.cos(radian.value) * radius.value + '%',
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
