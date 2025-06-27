<template>
  <view :class="stickyBoxClass" :style="stickyBoxStyle">
    <view :class="observeClass"></view>
    <slot></slot>
    <sar-resize-sensor initial :threshold="0" @resize="handleResize" />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  type NodeRect,
} from '../../utils'
import {
  type StickyBoxProps,
  type StickyBoxSlots,
  type StickyBoxEmits,
  type StickyBoxExpose,
  stickyContextSymbol,
} from './common'

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

const resizeHandlers: ((res: NodeRect) => void)[] = []

const onResize = (handler: (res: NodeRect) => void) => {
  const index = resizeHandlers.indexOf(handler)
  if (index === -1) {
    resizeHandlers.push(handler)
  }
}

const offResize = (handler: (res: NodeRect) => void) => {
  const index = resizeHandlers.indexOf(handler)
  if (index !== -1) {
    resizeHandlers.splice(index, 1)
  }
}

const handleResize = (res: NodeRect) => {
  resizeHandlers.forEach((handler) => handler(res))
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
