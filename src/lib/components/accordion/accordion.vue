<template>
  <view :class="accordionClass" :style="accordionStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type AccordionProps,
  type AccordionSlots,
  type AccordionEmits,
  type AccoridonContext,
  accoridonContextSymbol,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<AccordionProps>(), {})

defineSlots<AccordionSlots>()

const emit = defineEmits<AccordionEmits>()

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
    multiple: toRef(() => props.multiple),
    toggle,
    hideBorder: toRef(() => props.hideBorder),
  }),
)

// others
const accordionClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('borderless', props.hideBorder),
    props.rootClass,
  )
})

const accordionStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
