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
    <sar-calendar-popout
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
import SarCalendarPopout from '../calendar-popout/calendar-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  usePopoutInput,
} from '../../use'
import { type CalendarType } from '../calendar/common'
import { useTranslate } from '../locale'
import {
  type CalendarInputProps,
  type CalendarInputEmits,
  type CalendarInputSlots,
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

const slots = defineSlots<CalendarInputSlots>()

const emit = defineEmits<CalendarInputEmits>()

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

const onConfirm = () => {
  emit('confirm')
}
</script>
