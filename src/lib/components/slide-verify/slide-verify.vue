<template>
  <view :class="slideVerifyClass" :style="slideVerifyStyle">
    <view :class="bem.e('track')" :id="trackId">
      <slot name="text-before"></slot>
      <text :class="bem.e('track-text')">
        {{ text }}
      </text>
      <slot name="text-after"></slot>
    </view>
    <view :class="bem.e('valid-track')">
      <view :class="bem.e('fill')">
        {{ fillText }}
      </view>
      <view
        :class="bem.e('thumb')"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @mousedown="onMouseDown"
      >
        <sar-icon
          v-if="status & STATUS.INITIAL"
          family="sari"
          name="double-right"
        />
        <sar-loading v-else-if="status & STATUS.LOADING" />
        <sar-icon
          v-else-if="status & STATUS.SUCCESS"
          family="sari"
          name="check-circle-fill"
        />
        <sar-icon
          v-else-if="status & STATUS.ERROR"
          family="sari"
          name="x-circle-fill"
        />
      </view>
      <view v-if="showTarget" :class="bem.e('target')"></view>
    </view>
    <view :class="bem.e('fulfill')">
      <slot name="text-before"></slot>
      <text>{{ text }}</text>
      <slot name="text-after"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
  NodeRect,
  clamp,
} from '../../utils'
import {
  type SlideVerifyProps,
  type SlideVerifySlots,
  type SlideVerifyEmits,
  type SlideVerifyExpose,
  type SlideVerifyResult,
  defaultSlideVerifyProps,
} from './common'
import SarLoading from '../loading/loading.vue'
import SarIcon from '../icon/icon.vue'
import { useMouseDown } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SlideVerifyProps>(),
  defaultSlideVerifyProps,
)

defineSlots<SlideVerifySlots>()

defineEmits<SlideVerifyEmits>()

const bem = createBem('slide-verify')

// main
enum STATUS {
  INITIAL = 1 << 0,
  LOADING = 1 << 1,
  SUCCESS = 1 << 2,
  ERROR = 1 << 3,
}

const status = ref<STATUS>(STATUS.INITIAL)

const fillText = computed(() => {
  switch (status.value) {
    case STATUS.SUCCESS:
      return props.successText
    case STATUS.ERROR:
      return props.errorText
    default:
      return ''
  }
})

const percent = ref(0)
const trackPercent = ref(0)

const targetPos = computed(() => {
  return clamp(props.targetPos ?? 100, 0, 100)
})

const reset = () => {
  status.value = STATUS.INITIAL
  percent.value = 0
  trackPercent.value = 0
}

const trackId = uniqid()
const instance = getCurrentInstance()
const isDown = ref(false)
let downX = 0
let trackRect: NodeRect
let trajectory: [x: number, y: number, t: number][] = []
let startTime = 0

const onTouchStart = async (event: TouchEvent) => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }
  isDown.value = true

  const { clientX, clientY } = event.touches[0]

  startTime = Date.now()

  trajectory.push([clientX, clientY, startTime])

  downX = clientX
  trackRect = await getBoundingClientRect(`#${trackId}`, instance)
}

const onTouchMove = (event: TouchEvent) => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }
  if (!trackRect) return

  const { clientX, clientY } = event.touches[0]

  trajectory.push([clientX, clientY, Date.now()])

  const deltaX = clientX - downX

  const { width, height } = trackRect

  const total = width - height

  const x = clamp(deltaX, 0, total)
  percent.value = (x / total) * 100
  trackPercent.value = (x / width) * 100
}

const onTouchEnd = async () => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }

  isDown.value = false

  const data: SlideVerifyResult = {
    actualPos: percent.value,
    targetPos: targetPos.value,
    startTime,
    endTime: Date.now(),
    trajectory,
  }

  trajectory = []

  try {
    status.value = STATUS.LOADING
    const result = await props.verify?.(data)
    if (!result) {
      throw new Error()
    }
    status.value = STATUS.SUCCESS
  } catch {
    status.value = STATUS.ERROR

    if (props.resetWhenError) {
      reset()
    }
  }
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

// others
defineExpose<SlideVerifyExpose>({ reset })

const slideVerifyClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('down', isDown.value),
    bem.m('success', status.value & STATUS.SUCCESS),
    bem.m('error', status.value & STATUS.ERROR),
    bem.m('loading', status.value & STATUS.LOADING),
    props.rootClass,
  )
})

const slideVerifyStyle = computed(() => {
  return stringifyStyle(
    {
      '--valid-track-x': percent.value + '%',
      '--track-x': trackPercent.value + '%',
      '--target-x': targetPos.value + '%',
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
