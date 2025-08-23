<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :root-class="rootClass"
    :root-style="rootStyle"
    :arrow="arrow"
    :internal-arrow="$slots.arrow ? 1 : 0"
    :input-props="inputProps"
    @clear="onClear"
    @click="show"
  >
    <template v-if="$slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
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
      :resettable="resettable"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarDatetimeRangePickerPopout from '../datetime-range-picker-popout/datetime-range-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import { usePopoutInput } from '../../use'
import {
  type DatetimeRangePickerInputProps,
  type DatetimeRangePickerInputSlots,
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

defineSlots<DatetimeRangePickerInputSlots>()

const emit = defineEmits<DatetimeRangePickerInputEmits>()

// main
const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

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

const onConfirm = () => {
  emit('confirm')
}
</script>
