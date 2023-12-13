<template>
  <view
    :class="classNames(bem.b(), bem.m(direction), rootClass)"
    :style="stringifyStyle(rootStyle)"
  >
    <slot
      v-if="$slots.custom"
      name="custom"
      :toggle="toggle"
      :value="innerValue"
    ></slot>
    <slot v-else></slot>
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
import { ref, watch, provide, toRef, reactive } from 'vue'
import {
  type CheckboxContext,
  checkboxGroupProps,
  checkboxContextSymbol,
} from '../checkbox/common'
import { classNames, createBem, stringifyStyle } from '../utils'
import { useFormItemContext } from '../form/common'

const props = defineProps(checkboxGroupProps)

const emit = defineEmits(['update:model-value'])

const bem = createBem('checkbox-group')

// main
const formItemContext = useFormItemContext()

const innerValue = ref(props.modelValue || [])

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue || []

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const toggle: CheckboxContext['toggle'] = (value) => {
  emit(
    'update:model-value',
    innerValue.value.includes(value)
      ? innerValue.value.filter((v) => v !== value)
      : innerValue.value.concat(value),
  )
}

provide<CheckboxContext>(
  checkboxContextSymbol,
  reactive({
    disabled: toRef(props, 'disabled'),
    readonly: toRef(props, 'readonly'),
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    checkedColor: toRef(props, 'checkedColor'),
    value: innerValue,
    toggle,
  }),
)
</script>

<style lang="scss">
@use './index.scss';
</style>
