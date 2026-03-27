<template>
  <view :class="compactClass" :style="compactStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, shallowRef, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type CompactProps,
  type CompactSlots,
  type CompactEmits,
  type CompactExpose,
  type CompactContext,
  defaultCompactProps,
  compactContextSymbol,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CompactProps>(), defaultCompactProps())

defineSlots<CompactSlots>()

defineEmits<CompactEmits>()

const bem = createBem('compact')

// main
const items = shallowRef<any[]>([])

const addItem = (item: any) => {
  items.value = [...items.value, item]
}

const removeItem = (item: any) => {
  const index = items.value.indexOf(item)
  if (index !== -1) {
    items.value = [
      ...items.value.slice(0, index),
      ...items.value.slice(index + 1),
    ]
  }
}

provide<CompactContext>(
  compactContextSymbol,
  reactive({
    block: toRef(() => props.block),
    direction: toRef(() => props.direction),
    items: items,
    addItem,
    removeItem,
  }),
)

// others
defineExpose<CompactExpose>({})

const compactClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('block', props.block),
    bem.m(props.direction),
    props.rootClass,
  )
})

const compactStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
