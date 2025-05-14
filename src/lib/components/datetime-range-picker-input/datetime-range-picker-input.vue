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
    <sar-popout
      keep-render
      :visible="innerVisible"
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      @update:visible="onVisible"
      @confirm="onConfirm"
      @enter="onEnter"
    >
      <template #visible="{ already }">
        <sar-datetime-range-picker
          v-if="already"
          :model-value="popoutValue"
          @change="onChange"
          :type="type"
          :min="min"
          :max="max"
          :filter="filter"
          :formatter="formatter"
          :value-format="valueFormat"
          :tabs="tabs"
        />
      </template>
    </sar-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimeRangePicker from '../datetime-range-picker/datetime-range-picker.vue'
import { formatDate, isNullish, isString, parseDate, toDate } from '../../utils'
import {
  getInitialValue,
  getMaxDate,
  getMinDate,
} from '../datetime-picker/common'
import {
  type DatetimeRangePickerInputProps,
  type DatetimeRangePickerInputEmits,
  defaultDatetimeRangePickerInputProps,
} from './common'
import { mapTypeFormat } from '../datetime-picker-input/common'
import { useFormItemContext } from '../form/common'
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
const formItemContext = useFormItemContext()

// value
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

const popoutValue = ref(props.modelValue)

const onChange = (value: (Date | string)[]) => {
  popoutValue.value = value
}

const onEnter = () => {
  if (!isNullish(innerValue.value) && popoutValue.value !== innerValue.value) {
    popoutValue.value = innerValue.value
  }
}

const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const onConfirm = () => {
  if (!popoutValue.value) {
    const initialValue = getInitialValue(minDate.value, maxDate.value)
    const singleValue = props.valueFormat
      ? formatDate(initialValue, props.valueFormat)
      : initialValue

    popoutValue.value = [singleValue, singleValue]
  }

  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)
  emit('change', popoutValue.value)

  inputValue.value = getInputValue()
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

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const onVisible = (visible: boolean) => {
  innerVisible.value = visible
  emit('update:visible', visible)
}

const onInputClick = () => {
  innerVisible.value = true
  emit('update:visible', true)
}
</script>
