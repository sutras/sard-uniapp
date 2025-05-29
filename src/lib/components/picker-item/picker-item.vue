<template>
  <view :class="pickerItemClass" :style="pickerItemStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type PickerItemProps,
  type PickerItemSlots,
  type PickerItemEmits,
  type PickerItemExpose,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PickerItemProps>(), {})

defineSlots<PickerItemSlots>()

defineEmits<PickerItemEmits>()

const bem = createBem('picker')

// main

defineExpose<PickerItemExpose>({})

// others
const pickerItemClass = computed(() => {
  return classNames(bem.e('item'), props.rootClass)
})

const pickerItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
