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
    @click="onInputClick"
  >
    <sar-datetime-range-picker-popout
      keep-render
      v-model:visible="innerVisible"
      v-model="innerValue"
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :type="type"
      :min="min"
      :max="max"
      :filter="filter"
      :formatter="formatter"
      :value-format="valueFormat"
      :tabs="tabs"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarDatetimeRangePickerPopout from '../datetime-range-picker-popout/datetime-range-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import {
  type DatetimeRangePickerInputProps,
  type DatetimeRangePickerInputEmits,
  defaultDatetimeRangePickerInputProps,
} from './common'
import { mapTypeFormat } from '../datetime-picker-input/common'
import { useTranslate } from '../locale'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimeRangePickerInputProps>(),
  defaultDatetimeRangePickerInputProps(),
)

const emit = defineEmits<DatetimeRangePickerInputEmits>()

// main

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  emit('update:visible', innerVisible.value)
})

const onInputClick = () => {
  innerVisible.value = true
}

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const onChange = (value: (Date | string)[] | undefined) => {
  emit('update:model-value', value)
  emit('change', value)
}

// input
const inputValue = ref('')

const { t } = useTranslate('datetimeRangePickerInput')

function getOutletTextMayByStr(date: string | Date) {
  if (isString(date) && props.valueFormat) {
    date = parseDate(date, props.valueFormat)
  }
  if (date instanceof Date) {
    return formatDate(
      date,
      props.outletFormat ||
        mapTypeFormat[props.type as keyof typeof mapTypeFormat],
    )
  }
  return date
}

function getOutletText(value: (Date | string)[]) {
  return [
    getOutletTextMayByStr(value[0]),
    getOutletTextMayByStr(value[1]),
  ].join(` ${t('to')} `)
}

function getInputValue() {
  if (
    !innerValue.value ||
    (Array.isArray(innerValue.value) && innerValue.value.length === 0)
  ) {
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

const onClear = () => {
  inputValue.value = ''
  innerValue.value = undefined
  emit('update:model-value', undefined)
  emit('change', undefined)
}
</script>
