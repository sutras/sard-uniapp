<template>
  <view :class="colClass" :style="colStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  type ColProps,
  type ColSlots,
  type RowContext,
  rowSymbol,
} from '../layout/common'
import { classNames, stringifyStyle, createBem } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ColProps>(), {})

defineSlots<ColSlots>()

const context = inject<RowContext>(rowSymbol) as RowContext

if (!context) {
  throw new Error('Col must be included in Row.')
}

const bem = createBem('col')

// main

// others
const colClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.span, props.span !== undefined),
    bem.m(`offset-${props.offset}`, props.offset !== undefined),
    props.rootClass,
  )
})

const colStyle = computed(() => {
  const gutter = context.gutter

  return stringifyStyle(
    props.order !== undefined
      ? {
          order: props.order,
        }
      : null,
    context.gap
      ? {
          paddingLeft: gutter[0] + gutter[1],
          paddingRight: gutter[0] + gutter[1],
        }
      : null,
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
