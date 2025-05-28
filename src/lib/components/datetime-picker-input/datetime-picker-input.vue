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
    <sar-datetime-picker-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      keep-render
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :type="type"
      :min="min"
      :max="max"
      :filter="filter"
      :formatter="formatter"
      :value-format="valueFormat"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarDatetimePickerPopout from '../datetime-picker-popout/datetime-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import { usePopoutInput } from '../../use'
import {
  type DatetimePickerInputProps,
  type DatetimePickerInputEmits,
  defaultDatetimePickerInputProps,
  mapTypeFormat,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimePickerInputProps>(),
  defaultDatetimePickerInputProps(),
)

const emit = defineEmits<DatetimePickerInputEmits>()

// main
const { innerVisible, innerValue, inputValue, show, onChange, onClear } =
  usePopoutInput(props, emit)

function getOutletText(value: Date | string) {
  if (isString(value) && props.valueFormat) {
    value = parseDate(value, props.valueFormat)
  }
  if (value instanceof Date) {
    return formatDate(
      value,
      props.outletFormat ||
        mapTypeFormat[props.type as keyof typeof mapTypeFormat],
    )
  }
  return value
}

function getInputValue() {
  if (!innerValue.value) {
    return ''
  }
  return getOutletText(innerValue.value)
}

watch(
  innerValue,
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)
</script>
