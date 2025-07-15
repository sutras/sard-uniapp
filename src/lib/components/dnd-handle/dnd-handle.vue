<template>
  <view
    :class="dndHandleClass"
    :style="dndHandleStyle"
    @touchstart.stop.prevent="onDragTouchStart"
    @touchmove.stop.prevent="onDragTouchMove"
    @touchend="onDragTouchEnd"
    @touchcancel="onDragTouchEnd"
    @mousedown.stop="onDragMouseDown"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type DndHandleProps,
  type DndHandleSlots,
  type DndHandleEmits,
  type DndHandleExpose,
} from './common'
import { useMouseDown, useSimulatedPress } from '../../use'
import { dndItemContextKey } from '../dnd-item/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<DndHandleProps>(), {})

defineSlots<DndHandleSlots>()

defineEmits<DndHandleEmits>()

const bem = createBem('dnd-handle')

// main
const itemContext = inject(dndItemContextKey)

if (!itemContext) {
  throw new Error('DndHandle must be included in DndItem.')
}

const dragging = ref(false)

const onDragTouchStart = (event: TouchEvent) => {
  itemContext.immediateStart()
  onDragSimulatedPressTouchStart(event)
}

const onDragTouchMove = (event: TouchEvent) => {
  onDragSimulatedPressTouchMove(event)
}

const onDragTouchEnd = () => {
  dragging.value = false
  onDragSimulatedPressTouchEnd()
}

const [
  onDragSimulatedPressTouchStart,
  onDragSimulatedPressTouchMove,
  onDragSimulatedPressTouchEnd,
] = useSimulatedPress({
  start: () => {
    dragging.value = true
    itemContext.start()
  },
  move: (_, { delta }) => {
    itemContext.move(delta.y)
  },
  end: () => {
    itemContext.end()
  },
  duration: 150,
})

const onDragMouseDown = useMouseDown(
  onDragTouchStart,
  onDragTouchMove,
  onDragTouchEnd,
)

// others
defineExpose<DndHandleExpose>({})

const dndHandleClass = computed(() => {
  return classNames(bem.b(), bem.m('dragging', dragging), props.rootClass)
})

const dndHandleStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
