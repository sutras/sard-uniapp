<template>
  <sar-popout-input
    v-bind="popoutInputProps"
    v-model="inputValue"
    multiline
    @clear="onClear"
    @click="show"
  >
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template #arrow>
      <slot name="arrow"></slot>
    </template>
    <sar-checkbox-popout
      v-bind="omittedProps"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCheckboxPopout from '../checkbox-popout/checkbox-popout.vue'
import {
  type CheckboxInputProps,
  type CheckboxInputEmits,
  type CheckboxInputOption,
  type CheckboxInputSlots,
  defaultCheckboxInputProps,
} from './common'
import { isEmptyArray, isEmptyBinding } from '../../utils'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  useOptionKeys,
  usePopoutInput,
} from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CheckboxInputProps>(),
  defaultCheckboxInputProps(),
)

const slots = defineSlots<CheckboxInputSlots>()

const emit = defineEmits<CheckboxInputEmits>()

// main
const { getLabel, getValue } = useOptionKeys(props)

const popoutInputProps = pickPopoutInputProps(props, slots)

const omittedProps = omitPopoutInputProps(props)

const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

function getOutletText(options: CheckboxInputOption[], value: any[]) {
  return options
    .filter((option) => value.includes(getValue(option)))
    .map((option) => getLabel(option))
    .join(', ')
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.options, innerValue.value)
}

watch(
  [innerValue, () => props.options],
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = () => {
  emit('confirm')
}
</script>
