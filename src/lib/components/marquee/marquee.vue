<template>
  <view :class="marqueeClass" :style="marqueeStyle">
    <view :id="wrapperId" :class="bem.e('wrapper')" :style="wrapperStyle">
      <slot></slot>
      <sar-resize-sensor @resize="onResize" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'
import {
  type MarqueeProps,
  type MarqueeSlots,
  type MarqueeExpose,
  defaultMarqueeProps,
} from './common'
import { useTimeout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<MarqueeProps>(), defaultMarqueeProps)

defineSlots<MarqueeSlots>()

const bem = createBem('marquee')

// main
const instance = getCurrentInstance()
const wrapperId = uniqid()

const duration = ref(0)

const update = async () => {
  const { width, height } = await getBoundingClientRect(
    `#${wrapperId}`,
    instance,
  )

  const size = props.direction === 'vertical' ? height : width
  duration.value = (size / props.speed) * 1000
}

const { start: updateLater } = useTimeout(
  () => {
    update()
  },
  () => props.delay,
)

onMounted(() => {
  updateLater()
})

const onResize = () => {
  update()
}

defineExpose<MarqueeExpose>({
  update,
})

// others
const marqueeClass = computed(() => {
  return classNames(bem.b(), bem.m(props.direction), props.rootClass)
})

const marqueeStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const wrapperStyle = computed(() => {
  return stringifyStyle({
    animationDuration: `${duration.value}ms`,
    animationPlayState: duration.value ? 'running' : 'paused',
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
