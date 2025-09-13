<template>
  <sar-overlay
    :visible="visible"
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
    <view :class="itemEntryClass" @click="onItemEntryClick">
      <view :class="bem.e('item-btn')" :style="itemEntryBtnStyle">
        <sar-icon :family="iconFamily || 'sari'" :name="icon || 'plus'" />
      </view>
    </view>

    <view
      :class="contentClass"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <view
        v-for="(item, index) in itemList"
        :key="index"
        :class="itemClass"
        @click="onItemClick(item, index)"
      >
        <view v-if="!hideName" :class="bem.e('item-name')">
          {{ item.name }}
        </view>
        <view
          :class="bem.e('item-btn')"
          :style="
            stringifyStyle({ background: item.background, color: item.color })
          "
        >
          <sar-icon :family="item.iconFamily" :name="item.icon" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import {
  type FabProps,
  type FabEmits,
  defaultFabProps,
  FabItem,
} from './common'
import { useTransition, useZIndex } from '../../use'
import SarIcon from '../icon/icon.vue'
import SarOverlay from '../overlay/overlay.vue'
import { useFloatingBubble } from '../floating-bubble/useFloatingBubble'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FabProps>(), defaultFabProps())

const emit = defineEmits<FabEmits>()

const bem = createBem('fab')

// main
const visible = ref(false)

const [zIndex, increaseZIndex] = useZIndex()

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible,
    duration: toRef(() => props.duration),
    prefix: bem.m('zoom-'),
  }),
)

const onItemEntryClick = (event: any) => {
  if (stopBubbling.value) return

  if (props.itemList && props.itemList.length > 0) {
    visible.value = !visible.value
    if (visible.value) {
      increaseZIndex()
    }
  }
  emit('click', event)
}

const onItemClick = (item: FabItem, index: number) => {
  if (stopBubbling.value) return

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

// others
const fabClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(isTop.value ? 'top' : 'bottom'),
    bem.m(isLeft.value ? 'left' : 'right'),
    bem.m('visible', visible.value),
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

const itemEntryClass = computed(() => {
  return classNames(bem.e('item'), bem.em('item', 'entry'))
})

const itemEntryBtnStyle = computed(() => {
  return stringifyStyle({
    color: props.color,
    background: props.background,
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

const itemClass = computed(() => {
  return classNames(bem.e('item'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
