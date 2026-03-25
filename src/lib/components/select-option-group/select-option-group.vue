<template>
  <view :class="selectOptionGroupClass" :style="selectOptionGroupStyle">
    <view :class="bem.e('label')">
      {{ label }}
    </view>
    <view :class="bem.e('content')">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type SelectOptionGroupProps,
  type SelectOptionGroupSlots,
  type SelectOptionGroupEmits,
  type SelectOptionGroupExpose,
  type SelectOptionGroupContext,
  defaultSelectOptionGroupProps,
  selectOptionGroupContextSymbol,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SelectOptionGroupProps>(),
  defaultSelectOptionGroupProps(),
)

defineSlots<SelectOptionGroupSlots>()

defineEmits<SelectOptionGroupEmits>()

const bem = createBem('select-option-group')

// main
provide<SelectOptionGroupContext>(
  selectOptionGroupContextSymbol,
  reactive({
    disabled: toRef(() => props.disabled),
  }),
)

// others
defineExpose<SelectOptionGroupExpose>({})

const selectOptionGroupClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const selectOptionGroupStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
