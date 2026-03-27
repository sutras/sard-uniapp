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
    <sar-datetime-range-picker-popout
      v-bind="omittedProps"
      v-model:visible="innerVisible"
      v-model="innerValue"
      keep-render
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </sar-datetime-range-picker-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarDatetimeRangePickerPopout from '../datetime-range-picker-popout/datetime-range-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  usePopoutInput,
} from '../../use'
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

const slots = defineSlots<DatetimeRangePickerInputSlots>()

const emit = defineEmits<DatetimeRangePickerInputEmits>()

// main
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
