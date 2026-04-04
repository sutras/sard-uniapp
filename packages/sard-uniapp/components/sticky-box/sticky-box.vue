<template>
  <view :class="stickyBoxClass" :style="stickyBoxStyle">
    <view :class="observeClass"></view>
    <slot></slot>
    <sar-resize-sensor :threshold="0" @resize="handleResize" />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import {
  type Size,
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
} from '../../utils'
import {
  type StickyBoxProps,
  type StickyBoxSlots,
  type StickyBoxEmits,
  type StickyBoxExpose,
  stickyContextSymbol,
} from './common'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StickyBoxProps>(), {})

defineSlots<StickyBoxSlots>()

defineEmits<StickyBoxEmits>()

const bem = createBem('sticky-box')

// main
const boxId = uniqid()

const resizeHandlers: ((size: Size) => void)[] = []

const onResize = (handler: (size: Size) => void) => {
  const index = resizeHandlers.indexOf(handler)
  if (index === -1) {
    resizeHandlers.push(handler)
  }
}

const offResize = (handler: (size: Size) => void) => {
  const index = resizeHandlers.indexOf(handler)
  if (index !== -1) {
    resizeHandlers.splice(index, 1)
  }
}

const handleResize = (size: Size) => {
  resizeHandlers.forEach((handler) => handler(size))
}

const instance = getCurrentInstance()!

provide(stickyContextSymbol, {
  boxId,
  onResize,
  offResize,
  instance: instance,
})

defineExpose<StickyBoxExpose>({})

// others
const stickyBoxClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const stickyBoxStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const observeClass = computed(() => {
  return classNames(bem.e('observe'), boxId)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
