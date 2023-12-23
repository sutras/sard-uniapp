<template>
  <view :class="accordionClass" :style="accordionStyle">
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
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type AccoridonContext,
  accoridonContextSymbol,
  accordionProps,
} from './common'

const props = defineProps(accordionProps)

const emit = defineEmits(['update:model-value'])

const bem = createBem('accordion')

// main
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue || []
  },
)

const toggle: AccoridonContext['toggle'] = (name) => {
  let value: any
  if (props.multiple) {
    value = Array.isArray(innerValue.value) ? innerValue.value : []
    if (value.includes(name)) {
      value = value.filter((item: any) => item !== name)
    } else {
      value = value.concat(name)
    }
  } else {
    if (innerValue.value === name) {
      value = undefined
    } else {
      value = name
    }
  }
  innerValue.value = value
  emit('update:model-value', value)
}

provide<AccoridonContext>(
  accoridonContextSymbol,
  reactive({
    value: innerValue,
    multiple: toRef(props, 'multiple'),
    toggle,
  }),
)

// others
const accordionClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const accordionStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
