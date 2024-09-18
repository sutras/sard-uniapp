<template>
  {{ renderedNumer }}
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { addSeparator, createAnimation, type Timeline } from '../../utils'
import { type CountToProps, defaultCountToProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CountToProps>(), defaultCountToProps)

// main
const number = ref(0)
let tl: undefined | Timeline

const renderedNumer = computed(() => {
  const fixedNum = number.value.toFixed(props.precision)
  return props.separator
    ? addSeparator(fixedNum, props.separator, props.separatorDigit)
    : fixedNum
})

watch(
  () => props.value,
  () => {
    tl?.pause()
    tl = createAnimation(
      number,
      {
        value: props.value,
      },
      {
        duration: props.duration,
        easing: 'easeOutQuint',
        round: Math.pow(10, props.precision),
      },
    )
  },
  {
    flush: 'post',
    immediate: true,
  },
)

onUnmounted(() => {
  tl?.pause()
})
</script>
