<template>
  <view :class="gridClass" :style="gridStyle">
    <slot></slot>
  </view>
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
import { computed, provide, reactive, toRef } from 'vue'
import { splitUnit, classNames, stringifyStyle, createBem } from '../../utils'
import { type GridContext, gridProps, gridSymbol } from './common'

const props = defineProps(gridProps)

const bem = createBem('grid')

// main
const gutter = computed(() => {
  if (props.gap) {
    const result = splitUnit(props.gap)
    return [result[0] / 2, result[1] || 'rpx'] as const
  }
  return [0, 'rpx'] as const
})

provide<GridContext>(
  gridSymbol,
  reactive({
    columns: toRef(props, 'columns'),
    gap: toRef(props, 'gap'),
    gutter,
  }),
)

// others
const gridClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('bordered', props.bordered && gutter.value[0] <= 0),
    bem.m('surround', props.bordered && gutter.value[0] > 0),
    bem.m('square', props.square),
    bem.m('clickable', props.clickable),
    bem.m(props.direction),
    bem.m('reverse', props.reverse),
    props.rootClass,
  )
})

const gridStyle = computed(() => {
  return stringifyStyle(
    props.gap
      ? {
          marginLeft: -gutter.value[0] + gutter.value[1],
          marginRight: -gutter.value[0] + gutter.value[1],
        }
      : null,
    {
      rowGap: props.gap,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
