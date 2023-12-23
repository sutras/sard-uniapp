<template>
  <view :class="rowClass" :style="rowStyle">
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
import {
  type RowContext,
  rowSymbol,
  mapJustify,
  mapAlign,
  rowProps,
} from '../layout/common'

const props = defineProps(rowProps)

const bem = createBem('row')

// main
const gutter = computed(() => {
  if (props.gap) {
    const result = splitUnit(props.gap)
    return [result[0] / 2, result[1] || 'rpx'] as const
  }
  return [0, 'rpx'] as const
})

provide<RowContext>(
  rowSymbol,
  reactive({
    gap: toRef(props, 'gap'),
    gutter,
  }),
)

// others
const rowStyle = computed(() => {
  return stringifyStyle(
    {
      justifyContent: props.justify && mapJustify[props.justify],
      alignItems: props.align && mapAlign[props.align],
    },
    props.gap
      ? {
          marginLeft: -gutter.value[0] + gutter.value[1],
          marginRight: -gutter.value[0] + gutter.value[1],
        }
      : null,
    props.rootStyle,
  )
})

const rowClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
