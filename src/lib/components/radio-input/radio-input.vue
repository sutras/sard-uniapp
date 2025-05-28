<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :root-class="rootClass"
    :root-style="rootStyle"
    @clear="onClear"
    @click="show"
  >
    <sar-radio-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :size="size"
      :type="type"
      :checkedColor="checkedColor"
      :direction="direction"
      :options="options"
      :option-keys="optionKeys"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarRadioPopout from '../radio-popout/radio-popout.vue'
import { type RadioGroupOptionKeys, defaultOptionKeys } from '../radio/common'
import {
  type RadioInputProps,
  type RadioInputEmits,
  type RadioInputOption,
  defaultRadioInputProps,
} from './common'
import { getMayPrimitiveOption, isNullish } from '../../utils'
import { usePopoutInput } from '../../use'

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

const emit = defineEmits<RadioInputEmits>()

// main
const { innerVisible, innerValue, inputValue, show, onChange, onClear } =
  usePopoutInput(props, emit)

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

function getOutletText(
  options: RadioInputOption[],
  optionKeys: Required<RadioGroupOptionKeys>,
  value: any,
) {
  const option = options.find(
    (option) => getMayPrimitiveOption(option, optionKeys.value) === value,
  )
  return isNullish(option)
    ? ''
    : getMayPrimitiveOption(option, optionKeys.label)
}

function getInputValue() {
  if (isNullish(innerValue.value) || innerValue.value.length === 0) {
    return ''
  }
  return getOutletText(props.options, fieldKeys.value, innerValue.value)
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
</script>
