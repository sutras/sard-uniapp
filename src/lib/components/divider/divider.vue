<template>
  <view :class="dividerClass" :style="dividerStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type DividerProps,
  type DividerSlots,
  type DividerEmits,
  type DividerExpose,
  defaultDividerProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<DividerProps>(), defaultDividerProps)

const slots = defineSlots<DividerSlots>()

defineEmits<DividerEmits>()

const bem = createBem('divider')

// main

defineExpose<DividerExpose>({})

// others
const dividerClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.position),
    bem.m('vertical', props.vertical),
    bem.m('hairline', props.hairline),
    bem.m('only-line', !slots.default),
    props.rootClass,
  )
})

const dividerStyle = computed(() => {
  return stringifyStyle(
    {
      borderStyle: props.type,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
