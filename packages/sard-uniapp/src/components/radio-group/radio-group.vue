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
  type RadioGroupProps,
  type RadioGroupSlots,
  type RadioGroupEmits,
  type RadioContext,
  radioContextSymbol,
  radioGroupPropsDefaults,
} from '../radio/common'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<RadioGroupProps>(),
  radioGroupPropsDefaults,
)

defineSlots<RadioGroupSlots>()

const emit = defineEmits<RadioGroupEmits>()

const bem = createBem('radio-group')

// main
const formItemContext = useFormItemContext()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const toggle: RadioContext['toggle'] = (value) => {
  emit('update:model-value', value)
}

provide<RadioContext>(
  radioContextSymbol,
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
