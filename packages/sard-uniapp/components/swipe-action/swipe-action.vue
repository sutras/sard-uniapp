<template>
  <view
    :class="swipeActionClass"
    :style="swipeActionStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <view
      :id="contentId"
      :class="bem.e('content')"
      :style="translateStyle"
      @click="onContentClick"
      @mousedown="onContentMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    >
      <slot></slot>
      <view v-if="$slots.left" :id="leftId" :class="bem.e('left')" @click.stop>
        <slot name="left" :hide="hide"></slot>
      </view>
      <view
        v-if="$slots.right"
        :id="rightId"
        :class="bem.e('right')"
        @click.stop
      >
        <slot name="right" :hide="hide"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type SwipeActionProps,
  type SwipeActionSlots,
  type SwipeActionEmits,
  type SwipeActionExpose,
  type SwipeActionVisible,
} from './common'
import { useMouseDown, useInitialVelocity, useStopMovedClick } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SwipeActionProps>(), {})

const slots = defineSlots<SwipeActionSlots>()

const emit = defineEmits<SwipeActionEmits>()

const bem = createBem('swipe-action')

// main

// visible
const innerVisible = ref<SwipeActionVisible>(props.visible || false)

watch(
  () => props.visible,
  () => {
    if (props.visible !== innerVisible.value) {
      innerVisible.value = props.visible || false
      setTranslateXByVisible(innerVisible.value)
    }
  },
)

const triggerVisible = (visible: SwipeActionVisible) => {
  if (innerVisible.value !== visible) {
    innerVisible.value = visible
    emit('update:visible', visible)
  }
}

const hide = () => {
  triggerVisible(false)
  setTranslateXByVisible(false)
}

const onContentClick = () => {
  if (!props.disabled && !isStoppedClick.value) {
    hide()
  }
}

const {
  isStoppedClick,
  onMouseDown: onContentMouseDown,
  onMouseMove,
  onMouseUp,
} = useStopMovedClick()

// swipe
const contentId = uniqid()
const leftId = uniqid()
const rightId = uniqid()

const instance = getCurrentInstance()

let contentWidth: number | null = null
let leftWidth: number | null = null
let rightWidth: number | null = null

const translateX = ref(0)
const movable = ref(false)

let startX = 0
let startY = 0
let downTranslateX = 0
let lockDirection = ''
let canResolveVisible = false

const initVelocity = useInitialVelocity()

const getWidth = async () => {
  return Promise.all([
    getBoundingClientRect(`#${contentId}`, instance).then((rect) => {
      contentWidth = rect.width
    }),
    slots.left &&
      getBoundingClientRect(`#${leftId}`, instance).then((rect) => {
        leftWidth = rect.width
      }),
    slots.right &&
      getBoundingClientRect(`#${rightId}`, instance).then((rect) => {
        rightWidth = rect.width
      }),
  ])
}

const setTranslateXByVisible = (visible: SwipeActionVisible) => {
  translateX.value =
    visible === 'left'
      ? leftWidth || 0
      : visible === 'right'
        ? -(rightWidth || 0)
        : 0
}

onMounted(() => {
  setTimeout(() => {
    if (innerVisible.value) {
      getWidth().then(() => {
        setTranslateXByVisible(innerVisible.value)
      })
    } else {
      getWidth()
    }
  })
})

const onTouchStart = async (event: TouchEvent) => {
  if (props.disabled || (!slots.left && !slots.right)) {
    return
  }

  startX = event.touches[0].clientX
  startY = event.touches[0].clientY

  initVelocity.onStart({
    x: startX,
    y: startY,
  })

  downTranslateX = translateX.value

  movable.value = true

  getWidth()
}

const onTouchMove = (event: TouchEvent) => {
  if (!movable.value || (lockDirection && lockDirection !== 'x')) {
    return
  }

  const clientX = event.touches[0].clientX
  const clientY = event.touches[0].clientY
  const deltaX = clientX - startX
  const deltaY = clientY - startY

  initVelocity.onMove({
    x: clientX,
    y: clientY,
  })

  if (!lockDirection) {
    const isHorizontal = Math.abs(deltaX) >= Math.abs(deltaY)
    lockDirection = isHorizontal ? 'x' : 'y'
  }

  if (lockDirection === 'x') {
    if (
      contentWidth !== null &&
      (!slots.left || leftWidth !== null) &&
      (!slots.right || rightWidth !== null)
    ) {
      event.preventDefault()
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation()
      } else if (event.stopPropagation) {
        event.stopPropagation()
      }

      let nextTranslateX = downTranslateX + deltaX
      const leftEdge = leftWidth !== null ? leftWidth : 0
      const rightEdge = rightWidth !== null ? -rightWidth : 0

      if (nextTranslateX > leftEdge) {
        nextTranslateX = leftEdge
      }
      if (nextTranslateX < rightEdge) {
        nextTranslateX = rightEdge
      }

      translateX.value = nextTranslateX

      canResolveVisible = true
    }
  }
}

const onTouchEnd = () => {
  if (canResolveVisible) {
    const velocity = initVelocity.onEnd()

    const dependsOnSpeed = Math.abs(velocity.x) > 0.2

    const x = translateX.value

    let nextVisible: 'left' | 'right' | false = false

    if (x < 0) {
      if (
        (dependsOnSpeed && velocity.x < 0) ||
        (!dependsOnSpeed && Math.abs(x) >= rightWidth! / 2)
      ) {
        nextVisible = 'right'
        translateX.value = -rightWidth!
      } else {
        translateX.value = 0
      }
    } else if (x > 0) {
      if (
        (dependsOnSpeed && velocity.x > 0) ||
        (!dependsOnSpeed && Math.abs(x) >= leftWidth! / 2)
      ) {
        nextVisible = 'left'
        translateX.value = leftWidth!
      } else {
        translateX.value = 0
      }
    }

    triggerVisible(nextVisible)
  }

  movable.value = false
  lockDirection = ''
  canResolveVisible = false
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

// others
defineExpose<SwipeActionExpose>({
  hide,
})

const swipeActionClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const swipeActionStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const translateStyle = computed(() => {
  return stringifyStyle({
    transform: `translate3d(${translateX.value}px,0,0)`,
    transition: movable.value ? 'none' : `transform 300ms`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
