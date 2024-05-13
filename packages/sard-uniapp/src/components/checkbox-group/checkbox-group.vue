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

<script setup lang="ts">
import { ref, watch, provide, toRef, reactive } from 'vue'
import {
  type CheckboxGroupProps,
  type CheckboxGroupSlots,
  type CheckboxGroupEmits,
  type CheckboxContext,
  checkboxContextSymbol,
  checkboxGroupPropsDefaults,
} from '../checkbox/common'
import { classNames, createBem, stringifyStyle } from '../../utils'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CheckboxGroupProps>(),
  checkboxGroupPropsDefaults,
)

defineSlots<CheckboxGroupSlots>()

const emit = defineEmits<CheckboxGroupEmits>()

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
  const nextValue = innerValue.value.includes(value)
    ? innerValue.value.filter((v) => v !== value)
    : innerValue.value.concat(value)

  innerValue.value = nextValue
  emit('update:model-value', nextValue)
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
@import './index.scss';
</style>
