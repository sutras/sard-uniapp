<template>
  <view :class="skeletonBlockClass" :style="skeletonBlockStyle"></view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import { skeletonBlockProps } from '../skeleton/common'

const props = defineProps(skeletonBlockProps)

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
