<template>
  <view :class="stickyClass" :style="stickyStyle">
    <view :class="observeClass" :style="observeStyle">
      <view :class="fixationClass" :style="fixationStyle">
        <view :class="boundClass" :style="boundStyle">
          <slot></slot>
          <sar-resize-sensor initial :threshold="0" @resize="onResize" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeMount,
  onUnmounted,
  reactive,
  ref,
  toRef,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  type NodeRect,
  isNumber,
} from '../../utils'
import { useIntersectionObserver } from '../../use'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'
import {
  type StickyProps,
  type StickySlots,
  type StickyEmits,
  type StickyExpose,
} from './common'
import { stickyContextSymbol } from '../sticky-box/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StickyProps>(), {})

defineSlots<StickySlots>()

defineEmits<StickyEmits>()

const bem = createBem('sticky')

// main
const observeId = uniqid()

const positionStyle = reactive<{
  position: 'relative' | 'fixed'
  top: string
  bottom: string
}>({
  position: 'relative',
  top: '',
  bottom: '',
})

const boundingBox = ref<'top' | 'bottom' | 'none'>('none')

const width = ref<number | null>(null)
const height = ref<number | null>(null)

const context = inject(stickyContextSymbol, null)

const size = computed(() => {
  return {
    width: width.value !== null ? width.value + 'px' : '',
    height: height.value !== null ? height.value + 'px' : '',
  }
})

const { recreate } = useIntersectionObserver(
  (res) => {
    const { intersectionRatio, relativeRect, boundingClientRect } = res

    Object.assign(positionStyle, {
      position: 'relative',
      top: '',
      bottom: '',
    })

    if (intersectionRatio < 1) {
      if (
        isNumber(props.offsetTop) &&
        boundingClientRect.top < relativeRect.top
      ) {
        positionStyle.position = 'fixed'
        positionStyle.top = props.offsetTop + 'px'
      } else if (
        isNumber(props.offsetBottom) &&
        boundingClientRect.bottom > relativeRect.bottom
      ) {
        positionStyle.position = 'fixed'
        positionStyle.bottom = props.offsetBottom + 'px'
      }
    }
  },
  {
    selector: `.${observeId}`,
    thresholds: [1],
    offsetTop: toRef(() => props.offsetTop),
    offsetBottom: toRef(() => props.offsetBottom),
  },
)

let boxRecreate: (() => void) | null = null

if (context) {
  const { recreate } = useIntersectionObserver(
    (res) => {
      const { relativeRect, boundingClientRect } = res

      if (boundingClientRect.top > relativeRect.bottom) {
        boundingBox.value = 'top'
      } else if (boundingClientRect.bottom < relativeRect.top) {
        boundingBox.value = 'bottom'
      } else {
        boundingBox.value = 'none'
      }
    },
    {
      selector: `.${context.boxId}`,
      thresholds: [0],
      instance: context.instance,
      offsetTop: toRef(() => (props.offsetTop || 0) + (height.value || 0)),
      offsetBottom: toRef(
        () => (props.offsetBottom || 0) + (height.value || 0),
      ),
    },
  )
  boxRecreate = recreate
}

const onResize = (res: NodeRect) => {
  width.value = res.width
  height.value = res.height

  recreate()
}

const onBoxResize = () => {
  boxRecreate?.()
}

onBeforeMount(() => {
  context?.onResize(onBoxResize)
})

onUnmounted(() => {
  context?.offResize(onBoxResize)
})

defineExpose<StickyExpose>({})

// others
const stickyClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const stickyStyle = computed(() => {
  return stringifyStyle(size.value, props.rootStyle)
})

const observeClass = computed(() => {
  return classNames(bem.e('observe'), observeId)
})

const observeStyle = computed(() => {
  return stringifyStyle(size.value)
})

const fixationClass = computed(() => {
  return classNames(bem.e('fixation'))
})

const fixationStyle = computed(() => {
  return stringifyStyle(
    size.value,
    {
      zIndex: props.zIndex,
    },
    boundingBox.value === 'none'
      ? positionStyle
      : {
          position: 'absolute',
          top: boundingBox.value === 'top' ? 0 : '',
          bottom: boundingBox.value === 'bottom' ? 0 : '',
        },
  )
})

const boundClass = computed(() => {
  return classNames(bem.e('bound'))
})

const boundStyle = computed(() => {
  return stringifyStyle()
})
</script>

<style lang="scss">
@import './index.scss';
</style>
