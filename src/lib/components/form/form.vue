<template>
  <view :class="formClass" :style="formStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type FormProps,
  type FormSlots,
  type FormExpose,
  defaultFormProps,
} from './common'
import { useForm } from './useForm'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FormProps>(), defaultFormProps)

defineSlots<FormSlots>()

const bem = createBem('form')

// main
const { expose } = useForm(props)

defineExpose<FormExpose>(expose)

// others
const formClass = computed(() => {
  return classNames(bem.b(), bem.m('card', props.card), props.rootClass)
})

const formStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
