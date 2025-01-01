<template>
  <view :class="spaceClass" :style="spaceStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  defaultSpaceProps,
  spaceMapAlign,
  spaceSizes,
  type SpaceProps,
  type SpaceSlots,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SpaceProps>(), defaultSpaceProps)

defineSlots<SpaceSlots>()

const bem = createBem('space')

// main

const presetSize = computed(() => {
  return spaceSizes.includes(props.size)
})

// others
const spaceClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.direction),
    bem.m(props.size, presetSize.value),
    bem.m('wrap', props.wrap),
    props.rootClass,
  )
})

const spaceStyle = computed(() => {
  return stringifyStyle(
    {
      gap: presetSize.value ? null : props.size,
      alignItems: (props.align && spaceMapAlign[props.align]) ?? props.align,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
