import {
  computed,
  getCurrentInstance,
  MaybeRef,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue'
import { useMouseDown, useTimeout } from '../../use'
import {
  clamp,
  getBoundingClientRect,
  getWindowInfo,
  uniqid,
  type NodeRect,
} from '../../utils'

export interface UseFloatingBubbleProps {
  draggable?: boolean
  gapX: number
  gapY: number
  axis: 'x' | 'y' | 'none' | 'both'
  magnet?: 'x' | 'y'
  navbarHeight?: number
  tabbarHeight?: number
  offset?: {
    x: number
    y: number
  }
}

export interface UseFloatingBubbleEmits {
  (e: 'update:offset', offset: { x: number; y: number }): void
}

export interface UseFloatingBubbleOptions {
  disabled?: MaybeRef<boolean>
}

export function useFloatingBubble(
  props: UseFloatingBubbleProps,
  emit: UseFloatingBubbleEmits,
  options: UseFloatingBubbleOptions = {},
) {
  const disabled = computed(() => !props.draggable || unref(options.disabled))
  const instance = getCurrentInstance()
  const bubbleId = uniqid()

  const initialized = ref(false)

  let bubbleRect: NodeRect | undefined
  const {
    windowWidth,
    windowHeight,
    windowTop,
    statusBarHeight,
    safeAreaInsets,
  } = getWindowInfo()
  let downCoord = {
    x: 0,
    y: 0,
  }
  const position = ref({
    x: 0,
    y: 0,
  })

  const animated = ref(false)
  const stopBubbling = ref(false)

  const { start: nonAnimatedLater, stop: cancelNonAnimated } = useTimeout(
    () => {
      animated.value = false
    },
    500,
  )

  function getMinX() {
    return props.gapX
  }

  function getMaxX() {
    return windowWidth - props.gapX - bubbleRect!.width
  }

  function getMinY() {
    const navbarHeight = props.navbarHeight || 0
    return props.gapY + (navbarHeight ? navbarHeight + statusBarHeight : 0)
  }

  function getMaxY() {
    const tabbarHeight = props.tabbarHeight || 0
    return (
      windowHeight -
      tabbarHeight -
      safeAreaInsets.bottom -
      props.gapY -
      bubbleRect!.height
    )
  }

  const onTouchStart = async (event: TouchEvent) => {
    stopBubbling.value = false

    if (disabled.value) return

    cancelNonAnimated()
    animated.value = false

    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    bubbleRect = await getBoundingClientRect(`.${bubbleId}`, instance)
  }

  const onTouchMove = (event: TouchEvent) => {
    if (disabled.value) return

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

      const deviation = 10
      if (Math.abs(deltaX) > deviation || Math.abs(deltaY) > deviation) {
        stopBubbling.value = true
      }

      x = bubbleRect.left + deltaX
      y = bubbleRect.top + deltaY

      x = clamp(x, getMinX(), getMaxX())
      y = clamp(y, getMinY(), getMaxY())

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
    if (disabled.value) return

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
    nonAnimatedLater()

    bubbleRect = undefined
  }

  const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

  onMounted(async () => {
    bubbleRect = await getBoundingClientRect(`.${bubbleId}`, instance)

    position.value = props.offset ?? {
      x: getMaxX(),
      y: getMaxY(),
    }
    bubbleRect = undefined
    initialized.value = true
  })

  watch(
    () => props.offset,
    () => {
      if (props.offset) {
        position.value = props.offset
      }
    },
  )

  return {
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
  }
}
