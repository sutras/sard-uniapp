<template>
  <sar-popout-input
    v-bind="popoutInputProps"
    v-model="inputValue"
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
    <sar-radio-popout
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
import SarRadioPopout from '../radio-popout/radio-popout.vue'
import {
  type RadioInputProps,
  type RadioInputEmits,
  type RadioInputOption,
  type RadioInputSlots,
  defaultRadioInputProps,
} from './common'
import { isEmptyBinding, isNullish } from '../../utils'
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
  defineProps<RadioInputProps>(),
  defaultRadioInputProps(),
)

const slots = defineSlots<RadioInputSlots>()

const emit = defineEmits<RadioInputEmits>()

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

function getOutletText(options: RadioInputOption[], value: any) {
  const option = options.find((option) => getValue(option) === value)
  return isNullish(option) ? '' : getLabel(option)
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value)) {
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
