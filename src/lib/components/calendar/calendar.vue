<template>
  <view :class="calendarClass" :style="calendarStyle">
    <view :class="bem.e('header')">
      <view v-if="!severalMonths" :class="bem.e('toolbar')">
        <view :class="bem.e('toolbar-inner')">
          <sar-button
            type="pale-text"
            theme="neutral"
            :disabled="
              toMonthNumber(innerCurrentDate) <= toMonthNumber(minDate)
            "
            @click="onPrevMonthClick"
          >
            <sar-icon name="left" size="32rpx" />
          </sar-button>
          <sar-button type="pale-text" theme="neutral" @click="onMonthClick">
            {{
              t('monthTitle', {
                year: innerCurrentDate.getFullYear(),
                month: String(innerCurrentDate.getMonth() + 1).padStart(2, '0'),
              })
            }}
          </sar-button>
          <sar-button
            type="pale-text"
            theme="neutral"
            :disabled="
              toMonthNumber(innerCurrentDate) >= toMonthNumber(maxDate)
            "
            @click="onNextMonthClick"
          >
            <sar-icon name="right" size="32rpx" />
          </sar-button>
        </view>
      </view>
      <view :class="bem.e('week')">
        <view v-for="(item, i) in weeks" :key="i" :class="bem.e('week-item')">
          {{ t(`weeks.${item}`) }}
        </view>
      </view>
    </view>
    <scroll-view :scroll-y="severalMonths" :class="bem.e('body')">
      <sar-calendar-month
        v-for="(month, i) in months"
        :key="i"
        :year="month[0]"
        :month="month[1]"
        :type="type"
        :min-date="minDate"
        :max-date="maxDate"
        :current-dates="currentDates"
        :formatter="formatter"
        :disabled-date="disabledDate"
        :today-number="todayNumber"
        :week-starts-on="weekStartsOn"
        :several-months="severalMonths"
        :t="t"
        :bem="bem"
        @day-click="onDayClick"
      />
    </scroll-view>
  </view>

  <sar-popout
    v-if="!severalMonths"
    v-model:visible="pickerVisible"
    type="compact"
    @confirm="onPickerConfirm"
  >
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        type="yM"
        v-model="pickerValue"
        :min="minDate"
        :max="maxDate"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  minmaxDate,
  toDateNumber,
  toMonthNumber,
  getPrevMonthDate,
  getNextMonthDate,
  toArray,
  parseDate,
  formatDate,
} from '../../utils'
import {
  type CalendarProps,
  type CalendarEmits,
  defaultCalendarProps,
  getMaxDate,
  getMinDate,
  sortDates,
  weeksIndex,
} from './common'
import { useInPopup } from '../popup/common'
import SarButton from '../button/button.vue'
import SarIcon from '../icon/icon.vue'
import { useTranslate } from '../locale'
import SarCalendarMonth from '../calendar-month/calendar-month.vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CalendarProps>(), defaultCalendarProps)

const emit = defineEmits<CalendarEmits>()

const bem = createBem('calendar')

const { t } = useTranslate('calendar')

// main
const minDate = computed(() => {
  return props.min || getMinDate(props.severalMonths)
})

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate(props.severalMonths)
  return maxDate.getTime() < minDate.value.getTime()
    ? new Date(minDate.value)
    : maxDate
})

const toDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date
  }
  return parseDate(date, props.valueFormat)
}

const makeDate = (date: Date | Date[] | string | string[]) => {
  return Array.isArray(date) ? date.map((item) => toDate(item)) : toDate(date)
}

const normalizeValue = (
  value: string | string[] | Date | Date[] | undefined,
) => {
  return value ? makeDate(value) : props.type === 'single' ? undefined : []
}

const innerValue = ref<Date | Date[] | undefined>(
  normalizeValue(props.modelValue),
)

let currentEmitValue: string | string[] | Date | Date[] | undefined =
  innerValue.value

watch(
  () => props.modelValue,
  () => {
    if (currentEmitValue !== props.modelValue) {
      innerValue.value = normalizeValue(props.modelValue)
      currentEmitValue = props.modelValue
    }
  },
)

const getInitialCurrentDate = () => {
  let date = new Date()

  const value = toArray(innerValue.value)[0]
  if (value) {
    date = value
  }

  if (props.currentDate) {
    date = props.currentDate
  }

  return minmaxDate(date, minDate.value, maxDate.value)
}

const innerCurrentDate = ref(getInitialCurrentDate())

watch(
  () => props.currentDate,
  () => {
    innerCurrentDate.value = minmaxDate(
      props.currentDate || new Date(),
      minDate.value,
      maxDate.value,
    )
  },
)

watch(innerValue, () => {
  const onlyOneDate = Array.isArray(innerValue.value)
    ? innerValue.value.length === 1
      ? innerValue.value[0]
      : undefined
    : innerValue.value
  if (
    onlyOneDate &&
    toMonthNumber(onlyOneDate) !== toMonthNumber(innerCurrentDate.value)
  ) {
    innerCurrentDate.value = onlyOneDate
  }
})

const startDate = ref(
  props.type === 'range' &&
    Array.isArray(innerValue.value) &&
    innerValue.value.length === 1
    ? innerValue.value[0]
    : undefined,
)

// toolbar
const onPrevMonthClick = () => {
  innerCurrentDate.value = getPrevMonthDate(innerCurrentDate.value)
}

const onNextMonthClick = () => {
  innerCurrentDate.value = getNextMonthDate(innerCurrentDate.value)
}

// month picker
const pickerVisible = ref(false)
const pickerValue = ref(innerCurrentDate.value)

const onMonthClick = () => {
  pickerValue.value = innerCurrentDate.value
  pickerVisible.value = true
}

const onPickerConfirm = () => {
  if (
    toMonthNumber(innerCurrentDate.value) !== toMonthNumber(pickerValue.value)
  ) {
    innerCurrentDate.value = pickerValue.value
  }
}

// weeks
const weeks = computed(() => {
  return weeksIndex
    .slice(props.weekStartsOn)
    .concat(weeksIndex.slice(0, props.weekStartsOn))
})

// month
const months = computed(() => {
  if (!props.severalMonths) {
    return [
      [innerCurrentDate.value.getFullYear(), innerCurrentDate.value.getMonth()],
    ]
  }
  const minYear = minDate.value.getFullYear()
  const minMonth = minDate.value.getMonth()
  const maxYear = maxDate.value.getFullYear()
  const maxMonth = maxDate.value.getMonth()

  const months = (maxYear - minYear) * 12 + (maxMonth - minMonth + 1)

  return Array(months)
    .fill(0)
    .map((_, i) => {
      return [minYear + Math.floor((minMonth + i) / 12), (minMonth + i) % 12]
    })
})

// day
const todayNumber = toDateNumber(new Date())

const currentDates = computed(() => {
  let dates: Date[]

  if (props.type === 'range' && startDate.value) {
    dates = [startDate.value]
  } else {
    if (Array.isArray(innerValue.value)) {
      dates = innerValue.value
    } else if (innerValue.value) {
      dates = [innerValue.value]
    } else {
      dates = []
    }
  }

  return dates
})

const onDayClick = (date: Date) => {
  let nextValue: Date | Date[] | undefined

  if (props.type === 'single') {
    nextValue = date
  } else if (props.type === 'multiple') {
    if (Array.isArray(innerValue.value)) {
      if (
        innerValue.value.some((d) => toDateNumber(d) === toDateNumber(date))
      ) {
        nextValue = innerValue.value.filter(
          (d) => toDateNumber(d) !== toDateNumber(date),
        )
      } else {
        if (innerValue.value.length >= props.maxDays) {
          props.overMaxDays?.()
          return
        }
        nextValue = sortDates(innerValue.value.concat(date))
      }
    }
  } else if (props.type === 'range') {
    if (startDate.value) {
      const startDays = toDateNumber(startDate.value)
      const endDays = toDateNumber(date)

      if (!props.allowSameDay && startDays === endDays) {
        return
      }

      const startAgain = endDays < startDays
      if (startAgain) {
        startDate.value = date
        return
      }

      let endDate = date

      if (endDays - startDays + 1 > props.maxDays) {
        props.overMaxDays?.()

        endDate = new Date(startDate.value)
        endDate.setDate(endDate.getDate() + (props.maxDays - 1))
      }

      nextValue = [startDate.value, endDate]
    } else {
      nextValue = []
    }

    startDate.value = startDate.value ? undefined : date
  }

  if (nextValue !== undefined) {
    innerValue.value = nextValue

    const emitValue = props.valueFormat
      ? Array.isArray(nextValue)
        ? nextValue.map((item) => formatDate(item, props.valueFormat))
        : formatDate(nextValue, props.valueFormat)
      : nextValue

    currentEmitValue = emitValue

    emit('update:model-value', emitValue)
    emit('change', emitValue)
  }
}

// prevent page scroll
const inPopup = useInPopup()
const preventPageScroll = computed(() => {
  return inPopup && !props.severalMonths
})

// others
const calendarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('several', props.severalMonths),
    bem.m('no-scroll', preventPageScroll.value),
    props.rootClass,
  )
})

const calendarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
