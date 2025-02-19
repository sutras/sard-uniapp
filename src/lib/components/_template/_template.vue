<template>
  <view :class="_templateClass" :style="_templateStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type _TemplateProps,
  type _TemplateSlots,
  type _TemplateEmits,
  type _TemplateExpose,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<_TemplateProps>(), {})

defineSlots<_TemplateSlots>()

defineEmits<_TemplateEmits>()

const bem = createBem('_template')

// main

defineExpose<_TemplateExpose>({
  reset: () => {
    void 0
  },
})

// others
const _templateClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const _templateStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
