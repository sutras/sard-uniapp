<template>
  <sar-overlay
    :visible="visible && itemList?.length > 0"
    :z-index="zIndex"
    background="var(--sar-fab-mask)"
    @click="onOverlayClick"
  />

  <view
    :class="fabClass"
    :style="fabStyle"
    @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <sar-fab-item
      is-entry
      :color="color"
      :background="background"
      @click="onItemEntryClick"
    >
      <slot :visible="visible">
        <sar-icon :family="iconFamily || 'sari'" :name="entryIcon" />
      </slot>
    </sar-fab-item>

    <view
      :class="contentClass"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <slot name="list" :on-item-click="onItemClick">
        <sar-fab-item
          v-for="(item, index) in itemList"
          :key="index"
          :index="index"
          :name="item.name"
          :color="item.color"
          :background="item.background"
          :icon="item.icon"
          :icon-family="item.iconFamily"
          :item="item"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import {
  type FabProps,
  type FabSlots,
  type FabEmits,
  type FabContext,
  type FabItem,
  defaultFabProps,
  fabContextSymbol,
} from './common'
import { useTransition, useZIndex } from '../../use'
import SarIcon from '../icon/icon.vue'
import SarOverlay from '../overlay/overlay.vue'
import { useFloatingBubble } from '../floating-bubble/useFloatingBubble'
import SarFabItem from '../fab-item/fab-item.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FabProps>(), defaultFabProps())

defineSlots<FabSlots>()

const emit = defineEmits<FabEmits>()

const bem = createBem('fab')

// main
const visible = defineModel('visible', { default: false })

const [zIndex, increaseZIndex] = useZIndex()

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible,
    duration: toRef(() => props.duration),
    prefix: bem.m('zoom-'),
  }),
)

const entryIcon = computed(() => {
  return visible.value ? props.visibleIcon || 'close' : props.icon || 'plus'
})

const onItemEntryClick = (event: any) => {
  if (stopBubbling.value) return

  visible.value = !visible.value
  if (visible.value) {
    increaseZIndex()
  }

  emit('click', event)
}

const onItemClick = (item: FabItem, index: number) => {
  visible.value = false
  emit('select', item, index)
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    visible.value = false
  }
}

// floating bubble
const {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  position,
  initialized,
  animated,
  bubbleId,
  stopBubbling,
  windowWidth,
  windowHeight,
  windowTop,
} = useFloatingBubble(props, emit, {
  disabled: visible,
})

const isTop = computed(() => {
  return props.draggable
    ? position.value.y > windowHeight / 2
      ? false
      : true
    : !isNullish(props.top)
})

const isLeft = computed(() => {
  return props.draggable
    ? position.value.x > windowWidth / 2
      ? false
      : true
    : !isNullish(props.left)
})

provide<FabContext>(
  fabContextSymbol,
  reactive({
    hideName: toRef(() => props.hideName),
    isLeft: isLeft,
    visible: visible,
    onItemClick,
  }),
)

// others
const fabClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(isTop.value ? 'top' : 'bottom'),
    bem.m(isLeft.value ? 'left' : 'right'),
    bem.m('animated', animated.value),
    bem.m('initialized', initialized.value),
    bem.m('draggable', props.draggable),
    props.rootClass,
    bubbleId,
  )
})

const fabStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    zIndex: visible.value ? zIndex.value : null,
    ...(props.draggable
      ? {
          top: `${windowTop}px`,
          transform: `translate3d(${position.value.x}px, ${position.value.y}px, 0)`,
        }
      : {
          top: props.top,
          left: props.left,
          right: isLeft.value ? 'auto' : props.right,
          bottom: isTop.value ? 'auto' : props.bottom,
        }),
  })
})

const contentClass = computed(() => {
  return classNames(bem.e('content'), transitionClass.value)
})

const contentStyle = computed(() => {
  return stringifyStyle({
    display: realVisible.value ? 'flex' : 'none',
    transitionDuration: props.duration + 'ms',
    transformOrigin: `${isTop.value ? 'top' : 'bottom'} ${
      isLeft.value ? 'left' : 'right'
    }`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
