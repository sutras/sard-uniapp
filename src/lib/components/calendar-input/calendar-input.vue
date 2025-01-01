<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    @clear="onClear"
    @click="onInputClick"
  />

  <sar-popout
    :root-class="rootClass"
    :root-style="rootStyle"
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    :show-confirm="showConfirm"
    :confirm-disabled="confirmDisabled"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        :model-value="popoutValue"
        @change="onChange"
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
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCalendar from '../calendar/calendar.vue'
import SarPopout from '../popout/popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import { type CalendarType } from '../calendar/common'
import { useTranslate } from '../locale'
import {
  type CalendarInputProps,
  type CalendarInputEmits,
  defaultCalendarInputProps,
} from './common'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CalendarInputProps>(),
  defaultCalendarInputProps,
)

const emit = defineEmits<CalendarInputEmits>()

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

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const confirmDisabled = computed(() => {
  const value = popoutValue.value
  return !value || (Array.isArray(value) && value.length === 0)
})

const onChange = (value: any) => {
  popoutValue.value = value

  if (!props.showConfirm && !confirmDisabled.value) {
    onConfirm()
    innerVisible.value = false
  }
}

const onConfirm = () => {
  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)
  emit('change', popoutValue.value)

  inputValue.value = getInputValue()
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
    return `${getOutletTextMayByStr((date as string[] | Date[])[0])} ${t(
      'to',
    )} ${getOutletTextMayByStr((date as string[] | Date[])[1])}`
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
