<template>
  <PopoutInput
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    @clear="onClear"
    @click="onInputClick"
    :validate-event="validateEvent"
  />

  <Popout
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
      <Calendar
        v-if="already"
        :model-value="popoutValue"
        @update:model-value="onChange"
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
      />
    </template>
  </Popout>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import Calendar from '../calendar/calendar.vue'
import Popout from '../popout/popout.vue'
import { formatDate } from '../utils'
import { type CalendarType } from '../calendar/common'
import { useTranslate } from '../locale'
import { calendarInputProps } from './common'

const props = defineProps(calendarInputProps)

const emit = defineEmits(['update:visible', 'update:model-value'])

// main

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
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

const onConfirm = () => {
  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)

  inputValue.value = getInputValue()
}

const onChange = (value: any) => {
  popoutValue.value = value

  if (!props.showConfirm && !confirmDisabled.value) {
    onConfirm()
    innerVisible.value = false
  }
}

// input
const inputValue = ref('')

const format = 'YYYY-MM-DD'

const { t } = useTranslate('calendar')

function getOutletText(date: Date | Date[], type: CalendarType) {
  if (type === 'single') {
    return formatDate(date as Date, format)
  }

  if (type === 'range') {
    return `${formatDate((date as Date[])[0], format)} ${t('to')} ${formatDate(
      (date as Date[])[1],
      format,
    )}`
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
