<template>
  <view
    :class="floatingPanelClass"
    :style="floatingPanelStyle"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <view :class="bem.e('header')">
      <view :class="bem.e('header-bar')"></view>
    </view>
    <view :class="bem.e('body')">
      <scroll-view
        :scroll-y="canScroll"
        style="height: 100%"
        data-target="scroll-view"
        @touchmove.stop.prevent="onTouchMove"
        @scroll="onScroll"
      >
        <slot></slot>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getWindowInfo,
  isAlipay,
} from '../../utils'
import {
  type FloatingPanelProps,
  type FloatingPanelSlots,
  type FloatingPanelEmits,
  type FloatingPanelExpose,
  defaultFloatingPanelProps,
} from './common'
import { useMouseDown } from '../../use'
import { useInitialVelocity } from '../../use/useInitialVelocity'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<FloatingPanelProps>(),
  defaultFloatingPanelProps,
)

defineSlots<FloatingPanelSlots>()

const emit = defineEmits<FloatingPanelEmits>()

const bem = createBem('floating-panel')

// main

const mergedAnchors = computed(() => {
  const { windowHeight } = getWindowInfo()
  return props.anchors || [100, ~~(windowHeight * 0.6)]
})

let prevY = 0
let offsetY = ref(0)
const isDown = ref(false)
let target: 'scroll' | 'panel' = 'scroll'

watch(
  mergedAnchors,
  () => {
    offsetY.value = mergedAnchors.value[0]
  },
  {
    immediate: true,
  },
)

watch(
  () => props.height,
  () => {
    if (props.height) {
      offsetY.value = props.height
    }
  },
  {
    immediate: true,
  },
)

const triggerChange = (value: number, touchEnd?: boolean) => {
  if (offsetY.value !== value) {
    offsetY.value = value
    emit('update:height', offsetY.value)
    if (touchEnd) {
      emit('height-change', offsetY.value)
    }
  }
}

const canScroll = ref(false)
let scrollTop = 0
let prevScrollTop = 0
let targetLocked = false

const onScroll = (event: any) => {
  scrollTop = event.detail.scrollTop
}

const initVelocity = useInitialVelocity()

const onTouchStart = (event: TouchEvent) => {
  isDown.value = true
  prevY = event.touches[0].clientY
  prevScrollTop = scrollTop

  canScroll.value = offsetY.value > mergedAnchors.value[0]

  initVelocity.onStart({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  })
}

const onTouchMove = (event: TouchEvent) => {
  const currentTarget = event.currentTarget as any

  if (currentTarget.dataset?.target === 'scroll-view') {
    if (!props.contentDraggable || isAlipay) {
      return
    }
  }

  const currentY = event.touches[0].clientY
  let deltaY = prevY - currentY
  prevY = currentY

  if (!targetLocked) {
    targetLocked = true

    if (prevScrollTop === scrollTop) {
      target = 'panel'
      canScroll.value = false
    } else {
      target = 'scroll'
      canScroll.value = true
    }
    prevScrollTop = scrollTop
  }

  if (target === 'panel') {
    const anchors = mergedAnchors.value
    if (
      offsetY.value > anchors[anchors.length - 1] ||
      offsetY.value < anchors[0]
    ) {
      deltaY /= 4
    }
    triggerChange(offsetY.value + deltaY)
  }

  initVelocity.onMove({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  })
}

function getCorrectOffset(direction?: 'up' | 'down') {
  const anchors = mergedAnchors.value
  const min = anchors[0]
  const max = anchors[anchors.length - 1]
  const current = offsetY.value

  if (current <= min) {
    return min
  } else if (current >= max) {
    return max
  }

  for (let i = 1; i < anchors.length; i++) {
    const below = anchors[i - 1]
    const above = anchors[i]

    if (current >= below && current <= above) {
      if (direction) {
        return direction === 'up' ? above : below
      } else {
        return above - current < current - below ? above : below
      }
    }
  }

  return 0
}

const onTouchEnd = () => {
  if (target === 'panel') {
    const velocity = initVelocity.onEnd()
    let value = 0
    if (Math.abs(velocity.y) > 0.4) {
      value = getCorrectOffset(velocity.y > 0 ? 'down' : 'up')
    } else {
      value = getCorrectOffset()
    }
    triggerChange(value, true)
  }
  target = 'scroll'
  canScroll.value = true
  targetLocked = false
  isDown.value = false
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

// others
const floatingPanelClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('safe', props.safeAreaInsetBottom),
    props.rootClass,
  )
})

const floatingPanelStyle = computed(() => {
  return stringifyStyle(
    {
      transform: `translate3d(0, calc(100% - ${offsetY.value}px), 0)`,
      height: `${mergedAnchors.value[mergedAnchors.value.length - 1]}px`,
      transition: isDown.value
        ? 'none'
        : `transform ${props.duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
    },
    props.rootStyle,
  )
})

defineExpose<FloatingPanelExpose>({})
</script>

<style lang="scss">
@import './index.scss';
</style>
