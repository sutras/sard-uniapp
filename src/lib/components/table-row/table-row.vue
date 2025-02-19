<template>
  <view :class="rowClass" :style="rowStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type TableRowProps, type TableRowSlots } from '../table/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TableRowProps>(), {})

defineSlots<TableRowSlots>()

const bem = createBem('table')

// main

// others
const rowClass = computed(() => {
  return classNames(
    bem.e('row'),
    bem.em('row', 'fixed', props.fixed),
    props.rootClass,
  )
})

const rowStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
