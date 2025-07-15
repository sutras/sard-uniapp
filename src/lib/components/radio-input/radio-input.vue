<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :root-class="rootClass"
    :root-style="rootStyle"
    :internal-arrow="$slots.arrow ? 1 : 0"
    :input-props="inputProps"
    @clear="onClear"
    @click="show"
  >
    <template v-if="$slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
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
      :searchable="searchable"
      :filter-placeholder="filterPlaceholder"
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
  type RadioInputSlots,
  defaultRadioInputProps,
} from './common'
import { getMayPrimitiveOption, isEmptyBinding, isNullish } from '../../utils'
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

defineSlots<RadioInputSlots>()

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
  if (isEmptyBinding(innerValue.value)) {
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
