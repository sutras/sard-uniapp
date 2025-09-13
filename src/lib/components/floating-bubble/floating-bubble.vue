<template>
  <view
    :class="floatingBubbleClass"
    :style="floatingBubbleStyle"
    @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
    @click="onClick"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type FloatingBubbleProps,
  type FloatingBubbleSlots,
  type FloatingBubbleEmits,
  defaultFloatingBubbleProps,
} from './common'
import { useFloatingBubble } from './useFloatingBubble'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<FloatingBubbleProps>(),
  defaultFloatingBubbleProps,
)

defineSlots<FloatingBubbleSlots>()

const emit = defineEmits<FloatingBubbleEmits>()

const bem = createBem('floating-bubble')

// main
const {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  position,
  initialized,
  animated,
  bubbleId,
  windowTop,
} = useFloatingBubble(props, emit)

const onClick = (event: any) => {
  emit('click', event)
}

// others
const floatingBubbleClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('animated', animated.value),
    bem.m('initialized', initialized.value),
    props.rootClass,
    bubbleId,
  )
})

const floatingBubbleStyle = computed(() => {
  const { x, y } = position.value
  return stringifyStyle(props.rootStyle, {
    top: `${windowTop}px`,
    transform: `translate3d(${x}px, ${y}px, 0)`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
