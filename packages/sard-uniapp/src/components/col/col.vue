<template>
  <view :class="colClass" :style="colStyle">
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
import { computed, inject } from 'vue'
import { type RowContext, rowSymbol, colProps } from '../layout/common'
import { classNames, stringifyStyle, createBem } from '../../utils'

const props = defineProps(colProps)

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
    bem.m(props.span, props.span),
    bem.m(`offset-${props.span}`, props.offset),
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
@import './index.scss';
</style>
