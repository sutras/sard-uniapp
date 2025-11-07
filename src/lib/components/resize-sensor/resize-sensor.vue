<template>
  <view :class="resizeClass" :style="resizeStyle">
    <scroll-view
      :class="bem.e('scroll-view')"
      scroll-x
      scroll-y
      :scroll-left="scrollValue"
      :scroll-top="scrollValue"
      @scroll="onDebouncedScroll"
    >
      <view :class="bem.e('increase')"></view>
    </scroll-view>
    <scroll-view
      :class="bem.e('scroll-view')"
      scroll-x
      scroll-y
      :scroll-left="scrollValue"
      :scroll-top="scrollValue"
      @scroll="onDebouncedScroll"
    >
      <view :class="bem.e('decrease')"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  debounce,
} from '../../utils'
import {
  type ResizeSensorProps,
  type ResizeSensorSlots,
  type ResizeSensorEmits,
  type ResizeSensorExpose,
  defaultResizeSensorProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ResizeSensorProps>(),
  defaultResizeSensorProps,
)

defineSlots<ResizeSensorSlots>()

const emit = defineEmits<ResizeSensorEmits>()

const bem = createBem('resize-sensor')

// main

const instance = getCurrentInstance()

const resizeId = uniqid()

const bounding = ref({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  height: 0,
  width: 0,
})

let firstTime = true

watch(bounding, () => {
  if (!firstTime || props.initial) {
    emit('resize', { ...bounding.value })
  }
  firstTime = false
})

const scrollValue = ref(0)

let count = 0

const reset = () => {
  scrollValue.value = 100000 + ++count
}

// 避免频繁触发
const debouncedUpdate = debounce(
  async () => {
    const rect = await getBoundingClientRect(`.${resizeId}`, instance)
    bounding.value = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height,
      width: rect.width,
    }
  },
  props.threshold,
  {
    maxWait: 0,
    leading: true,
    trailing: true,
  },
)

// 避免 increase + decrease 触发两次
const onDebouncedScroll = debounce(
  () => {
    reset()
    debouncedUpdate()
  },
  15,
  {
    maxWait: 0,
    leading: true,
    trailing: false,
  },
)

onMounted(() => {
  nextTick(reset)
})

defineExpose<ResizeSensorExpose>({})

// others
const resizeClass = computed(() => {
  return classNames(bem.b(), resizeId, props.rootClass)
})

const resizeStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
