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
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import {
  type NodeRect,
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
  getWindowInfo,
  minmax,
} from '../../utils'
import {
  type FloatingBubbleProps,
  type FloatingBubbleSlots,
  type FloatingBubbleEmits,
  defaultFloatingBubbleProps,
} from './common'
import { useMouseDown, useSetTimeout } from '../../use'

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
const instance = getCurrentInstance()
const bubbleId = uniqid()

let bubbleRect: NodeRect | undefined
const { windowWidth, windowHeight } = getWindowInfo()
let downCoord = {
  x: 0,
  y: 0,
}
const initialized = ref(false)
const position = ref({
  x: 0,
  y: 0,
})

watch(
  () => props.offset,
  () => {
    if (props.offset) {
      position.value = props.offset
    }
  },
)

const animated = ref(false)

const [nonAnimatedLater, cancelNonAnimated] = useSetTimeout(() => {
  animated.value = false
})

function getMinX() {
  return props.gapX
}

function getMaxX() {
  return windowWidth - props.gapX - bubbleRect!.width
}

function getMinY() {
  return props.gapY + 44 + 25
}

function getMaxY() {
  return windowHeight - props.gapY - bubbleRect!.height
}

onMounted(async () => {
  bubbleRect = await getBoundingClientRect(`.${bubbleId}`, instance)

  position.value = props.offset ?? {
    x: getMaxX(),
    y: getMaxY(),
  }
  bubbleRect = undefined
  initialized.value = true
})

const onTouchStart = async (event: TouchEvent) => {
  cancelNonAnimated()
  animated.value = false

  downCoord = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }
  bubbleRect = await getBoundingClientRect(`.${bubbleId}`, instance)
}

const onTouchMove = (event: TouchEvent) => {
  if (!bubbleRect) {
    return
  }

  let x = 0
  let y = 0

  if (props.axis === 'none') {
    x = getMaxX()
    y = getMaxY()
  } else {
    const deltaX = event.touches[0].clientX - downCoord.x
    const deltaY = event.touches[0].clientY - downCoord.y
    x = bubbleRect.left + deltaX
    y = bubbleRect.top + deltaY

    x = minmax(x, getMinX(), getMaxX())
    y = minmax(y, getMinY(), getMaxY())

    if (props.axis === 'y') {
      x = getMaxX()
    } else if (props.axis === 'x') {
      y = getMaxY()
    }
  }

  const offset = {
    x,
    y,
  }
  position.value = offset
  emit('update:offset', offset)
}

const onTouchEnd = () => {
  if (bubbleRect) {
    if (props.magnet) {
      let { x, y } = position.value
      if (props.magnet === 'x') {
        x = x < (windowWidth - bubbleRect.width) / 2 ? getMinX() : getMaxX()
      } else if (props.magnet === 'y') {
        y = y < (windowHeight - bubbleRect.height) / 2 ? getMinY() : getMaxY()
      }

      const offset = {
        x,
        y,
      }
      position.value = offset
      emit('update:offset', offset)
    }
  }
  animated.value = true
  nonAnimatedLater(500)

  bubbleRect = undefined
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

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
  return stringifyStyle(props.rootStyle, {
    transform: `translate3d(${position.value.x}px, ${position.value.y}px, 0)`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
