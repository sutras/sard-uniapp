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
    <sar-calendar-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      :title="title ?? placeholder"
      :show-confirm="showConfirm"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :type="type"
      :min="min"
      :max="max"
      :current-date="currentDate"
      :disabled-date="disabledDate"
      :max-days="maxDays"
      :over-max-days="overMaxDays"
      :week-starts-on="weekStartsOn"
      :formatter="formatter"
      :allow-same-day="allowSameDay"
      :several-months="severalMonths"
      :value-format="valueFormat"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCalendarPopout from '../calendar-popout/calendar-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import { type CalendarType } from '../calendar/common'
import { useTranslate } from '../locale'
import {
  type CalendarInputProps,
  type CalendarInputEmits,
  defaultCalendarInputProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CalendarInputProps>(),
  defaultCalendarInputProps(),
)

const emit = defineEmits<CalendarInputEmits>()

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

const onChange = (value: any) => {
  emit('update:model-value', value)
  emit('change', value)
}

// input
const inputValue = ref('')

const { t } = useTranslate('calendar')

function getOutletTextMayByStr(date: string | Date) {
  if (isString(date) && props.valueFormat) {
    date = parseDate(date, props.valueFormat)
  }
  if (date instanceof Date) {
    return formatDate(date, props.outletFormat)
  }
  return date
}

function getOutletText(
  date: Date | Date[] | string | string[],
  type: CalendarType,
) {
  if (type === 'single') {
    return getOutletTextMayByStr(date as string | Date)
  }

  if (type === 'range') {
    return [
      getOutletTextMayByStr((date as string[] | Date[])[0]),
      getOutletTextMayByStr((date as string[] | Date[])[1]),
    ].join(` ${t('to')} `)
  }

  if (type === 'multiple') {
    return t('multipleOutlet', {
      count: (date as Date[]).length,
    })
  }

  return ''
}

function getInputValue() {
  if (
    !innerValue.value ||
    (Array.isArray(innerValue.value) && innerValue.value.length === 0)
  ) {
    return ''
  }
  return getOutletText(innerValue.value, props.type)
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
