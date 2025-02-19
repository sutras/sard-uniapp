<template>
  <view :class="skeletonBlockClass" :style="skeletonBlockStyle"></view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type SkeletonBlockProps } from '../skeleton/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SkeletonBlockProps>(), {})

const bem = createBem('skeleton')

// main

// others
const skeletonBlockClass = computed(() => {
  return classNames(
    bem.e('block'),
    bem.m('animated', props.animated),
    bem.m('round', props.round),
    props.rootClass,
  )
})

const skeletonBlockStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.width,
      height: props.height,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
