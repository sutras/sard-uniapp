<template>
  <view :class="sliderClass" :style="sliderStyle" @click="onSliderClick">
    <view
      :class="bem.e('track')"
      :id="trackId"
      :style="
        stringifyStyle({
          width: vertical ? trackSize : null,
          height: !vertical ? trackSize : null,
          backgroundColor: trackColor,
        })
      "
    >
      <view
        :class="bem.e('piece')"
        :style="
          stringifyStyle({
            [vertical ? 'top' : 'left']: rangePercent[0],
            [vertical ? 'height' : 'width']: rangePercent[1],
            backgroundColor: pieceColor,
          })
        "
      >
        <view
          v-if="range"
          :class="
            classNames(
              bem.e('thumb-container'),
              bem.em('thumb-container', 'start'),
            )
          "
          @touchstart="onTouchStart($event, 0)"
          @touchmove.stop.prevent="onTouchMove($event, 0)"
          @touchend="onTouchEnd($event)"
          @touchcancel="onTouchEnd($event)"
          @mousedown="onMouseDown($event, 0)"
        >
          <slot name="start-thumb" :value="rangeValue[0]">
            <view :class="bem.e('thumb')" :style="thumbStyle"></view>
          </slot>
          <view v-if="showValue" :class="valueClass" :style="valueStyle">
            {{ rangeValue[0] }}
          </view>
        </view>
        <view
          :class="
            classNames(
              bem.e('thumb-container'),
              bem.em('thumb-container', 'end'),
            )
          "
          @touchstart="onTouchStart($event, 1)"
          @touchmove.stop.prevent="onTouchMove($event, 1)"
          @touchend="onTouchEnd($event)"
          @touchcancel="onTouchEnd($event)"
          @mousedown="onMouseDown($event, 1)"
        >
          <slot name="end-thumb" :value="rangeValue[1]">
            <view :class="bem.e('thumb')" :style="thumbStyle"></view>
          </slot>
          <view v-if="showValue" :class="valueClass" :style="valueStyle">
            {{ rangeValue[1] }}
          </view>
        </view>
      </view>
      <template v-if="showScale">
        <view
          v-for="(scale, i) in scales"
          :key="i"
          :class="
            classNames(bem.e('scale'), bem.em('scale', 'active', scale.active))
          "
          :style="stringifyStyle(scale.style)"
        >
          <view :class="bem.e('scale-text')">{{ scale.value }}</view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  NodeRect,
  getBoundingClientRect,
  minmax,
  mround,
  arrayEqual,
  toArray,
  toTouchEvent,
} from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type SliderProps,
  type SliderSlots,
  type SliderEmits,
  sliderPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SliderProps>(), sliderPropsDefaults)

defineSlots<SliderSlots>()

const emit = defineEmits<SliderEmits>()

const bem = createBem('slider')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled ?? props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly ?? props.readonly
})

const innerValue = ref<number | number[]>(
  props.modelValue ?? (props.range ? [props.min, props.min] : props.min),
)

watch(
  () => props.modelValue,
  () => {
    innerValue.value =
      props.modelValue ?? (props.range ? [props.min, props.min] : props.min)

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const trackId = uniqid()
const instance = getCurrentInstance()
let trackRect: NodeRect
let downValue: number | number[]
let moveValue: number | number[]
let downRatio = 0
let triggerMove = false

const onSliderClick = async (event: MouseEvent | TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const { clientY, clientX } = 'touches' in event ? event.touches[0] : event

  trackRect = await getBoundingClientRect(`#${trackId}`, instance)

  const trackSize = props.vertical ? trackRect.height : trackRect.width
  const tapCoord = props.vertical ? clientY : clientX
  const startCoord = props.vertical ? trackRect.top : trackRect.left
  const offset = tapCoord - startCoord
  const ratio = offset / trackSize
  const total = props.max - props.min
  const tapValue = minmax(
    mround(props.min + total * ratio, props.step),
    props.min,
    props.max,
  )

  let nextValue: number | number[] | undefined

  if (Array.isArray(innerValue.value)) {
    const [start, end] = innerValue.value

    if (Math.abs(tapValue - end) <= Math.abs(tapValue - start)) {
      if (tapValue !== innerValue.value[1]) {
        nextValue = [start, tapValue]
      }
    } else {
      if (tapValue !== innerValue.value[0]) {
        nextValue = [tapValue, end]
      }
    }
  } else {
    if (tapValue !== innerValue.value) {
      nextValue = tapValue
    }
  }

  if (nextValue !== undefined) {
    innerValue.value = nextValue
    emit('update:model-value', nextValue)
    emit('change', nextValue)
  }
}

let downCoord = {
  x: 0,
  y: 0,
}

const onTouchStart = async (event: TouchEvent, index: number) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  downCoord = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }

  trackRect = await getBoundingClientRect(`#${trackId}`, instance)

  const thumbValue = Array.isArray(innerValue.value)
    ? innerValue.value[index]
    : innerValue.value

  downRatio = (thumbValue - props.min) / (props.max - props.min)
  downValue = innerValue.value
  moveValue = innerValue.value
}

const onTouchMove = (event: TouchEvent, index: number) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  if (!triggerMove) {
    triggerMove = true
    emit('drag-start', event)
  }

  if (!trackRect) {
    return
  }

  const deltaX = event.touches[0].clientX - downCoord.x
  const deltaY = event.touches[0].clientY - downCoord.y

  const trackSize = props.vertical ? trackRect.height : trackRect.width
  const delta = props.vertical ? deltaY : deltaX
  const ratio = delta / trackSize + downRatio
  const total = props.max - props.min
  const tapValue = minmax(
    mround(props.min + total * ratio, props.step),
    props.min,
    props.max,
  )

  let nextValue: number | number[]

  if (Array.isArray(downValue)) {
    const [start, end] = downValue

    if (index === 1) {
      nextValue = tapValue < start ? [tapValue, start] : [start, tapValue]
    } else {
      nextValue = tapValue > end ? [end, tapValue] : [tapValue, end]
    }
  } else {
    nextValue = tapValue
  }

  if (!arrayEqual(toArray(nextValue), toArray(moveValue))) {
    moveValue = nextValue

    innerValue.value = nextValue
    emit('update:model-value', nextValue)
  }
}

const onTouchEnd = (event: TouchEvent) => {
  triggerMove = false

  if (isDisabled.value || isReadonly.value) {
    return
  }

  if (!arrayEqual(toArray(downValue), toArray(innerValue.value))) {
    emit('change', innerValue.value)
  }
  emit('drag-end', event)
}

const onMouseDown = (event: MouseEvent, index: number) => {
  // #ifdef H5
  const info = uni.getSystemInfoSync()

  onTouchStart(toTouchEvent(event, info.windowTop), index)

  const moveHandler = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onTouchMove(toTouchEvent(event, info.windowTop), index)
  }
  const upHandler = () => {
    onTouchEnd(event as unknown as TouchEvent)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('mousemove', moveHandler)
  }
  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
  // #endif
}

const rangeValue = computed(() => {
  let startValue: number
  let endValue: number

  if (Array.isArray(innerValue.value)) {
    startValue = innerValue.value[0]
    endValue = innerValue.value[1]
  } else {
    startValue = props.min
    endValue = innerValue.value
  }
  return [startValue, endValue]
})

const rangePercent = computed(() => {
  const startRatio = (rangeValue.value[0] - props.min) / (props.max - props.min)
  const endRatio = (rangeValue.value[1] - props.min) / (props.max - props.min)
  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  return [startPercent, endPercent]
})

const scales = computed(() => {
  if (!props.showScale) {
    return []
  }

  const total = props.max - props.min
  const direction = props.vertical ? 'top' : 'left'
  const scales = [
    {
      value: props.min,
      style: {
        [direction]: '0%',
      },
      active: props.min === rangeValue.value[0],
    },
  ]
  let scale = props.min

  do {
    scale += props.step
    if (scale > props.max) {
      scale = props.max
    }
    scales.push({
      value: scale,
      style: {
        [direction]: ((scale - props.min) / total) * 100 + '%',
      },
      active: scale >= rangeValue.value[0] && scale <= rangeValue.value[1],
    })
  } while (scale < props.max)

  return scales
})

// others
const sliderClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('vertical', props.vertical),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m('show-scale', props.showScale),
    bem.m(
      `scale-${props.scalePosition ?? (props.vertical ? 'left' : 'bottom')}`,
      props.showScale,
    ),
    props.rootClass,
  )
})

const sliderStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const thumbStyle = computed(() => {
  return stringifyStyle({
    width: props.thumbSize,
    height: props.thumbSize,
    backgroundColor: props.thumbColor,
  })
})

const valueClass = computed(() => {
  return classNames(
    bem.e('value'),
    bem.em('value', props.valuePosition ?? (props.vertical ? 'right' : 'top')),
  )
})

const valueStyle = computed(() => {
  return stringifyStyle({
    backgroundColor: props.valueBackground,
    color: props.valueColor,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
