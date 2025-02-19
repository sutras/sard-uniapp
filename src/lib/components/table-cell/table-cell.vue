<template>
  <view :class="cellClass" :style="cellStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import { type TableCellProps, type TableCellSlots } from '../table/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TableCellProps>(), {})

defineSlots<TableCellSlots>()

const bem = createBem('table')

// main

// others
const cellClass = computed(() => {
  const fixedSide = props.fixed === true ? 'left' : props.fixed
  return classNames(
    bem.e('cell'),
    bem.em('cell', 'bold', props.bold),
    bem.em('cell', 'fixed-' + fixedSide, props.fixed),
    props.rootClass,
  )
})

const cellStyle = computed(() => {
  const isFlexGrow = !isNaN(Number(props.width))

  return stringifyStyle(
    {
      width: isNullish(props.width) || isFlexGrow ? undefined : props.width,
      flex: isNullish(props.width)
        ? undefined
        : isFlexGrow
        ? props.width
        : `${parseFloat(props.width)} 0 ${props.width}`,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
