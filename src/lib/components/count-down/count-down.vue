<template>
  <slot :time="currentTime">
    {{ formatTime(format, currentTime) }}
  </slot>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  type CountDownProps,
  type CountDownSlots,
  type CountDownEmits,
  type CountDownExpose,
  type CountDownCurrentTime,
  getCurrentTime,
  formatTime,
  defaultCountDownProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CountDownProps>(), defaultCountDownProps)

defineSlots<CountDownSlots>()

const emit = defineEmits<CountDownEmits>()

// main
const remainTime = ref(props.time)
let endTime = 0
let timer: any = null
let paused = true

const tick = () => {
  const now = Date.now()
  remainTime.value = Math.max(endTime - now, 0)

  if (remainTime.value === 0) {
    pause()
    emit('finish')
    return
  }
  timer = setTimeout(() => {
    tick()
  }, 30)
}

const start = () => {
  if (!paused) {
    return
  }
  paused = false
  endTime = Date.now() + remainTime.value
  tick()
}

const pause = () => {
  if (paused) {
    return
  }
  clearTimeout(timer)
  timer = null
  paused = true
}

const reset = () => {
  pause()
  remainTime.value = props.time
}

const precisionTime = computed(() => {
  if (props.millisecond) {
    return remainTime.value
  }
  return Math.floor(remainTime.value / 1000) * 1000
})

const currentTime = ref<CountDownCurrentTime>(
  getCurrentTime(precisionTime.value),
)

watch(precisionTime, () => {
  currentTime.value = getCurrentTime(precisionTime.value)
  emit('change', currentTime.value)
})

defineExpose<CountDownExpose>({
  start,
  pause,
  reset,
})

onMounted(() => {
  if (props.autoStart) {
    start()
  }
})

onBeforeUnmount(() => {
  pause()
})
</script>
