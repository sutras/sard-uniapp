<template>
  <view
    :class="resizeClass"
    :style="resizeStyle"
    @animationend.stop="debouncedUpdate"
  >
    <scroll-view
      :class="bem.e('scroll-view')"
      scroll-x
      scroll-y
      :scroll-left="scrollValue"
      :scroll-top="scrollValue"
      @scroll="debouncedUpdate"
    >
      <view :class="bem.e('increase')"></view>
    </scroll-view>
    <scroll-view
      :class="bem.e('scroll-view')"
      scroll-x
      scroll-y
      :scroll-left="scrollValue"
      :scroll-top="scrollValue"
      @scroll="debouncedUpdate"
    >
      <view :class="bem.e('decrease')"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'
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
  defaultResizeSensorProps(),
)

defineSlots<ResizeSensorSlots>()

const emit = defineEmits<ResizeSensorEmits>()

const bem = createBem('resize-sensor')

// main

const instance = getCurrentInstance()

const resizeId = uniqid()

const size = reactive({
  height: 0,
  width: 0,
})

watch(
  () => Object.assign({}, size),
  (value) => {
    emit('resize', value)
  },
)

const scrollValue = ref(0)

let count = 0

const reset = () => {
  scrollValue.value = 100000 + ++count
}

// 避免频繁触发
const debouncedUpdate = debounce(
  async () => {
    const rect = await getBoundingClientRect(`.${resizeId}`, instance)
    size.width = rect.width
    size.height = rect.height
    reset()
  },
  props.threshold,
  {
    maxWait: 0,
    leading: true,
    trailing: true,
  },
)

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
