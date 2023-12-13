<template>
  <view :class="calendarClass" :style="calendarStyle">
    <view :class="bem.e('header')">
      <view v-if="!severalMonths" :class="bem.e('toolbar')">
        <view :class="bem.e('toolbar-inner')">
          <Button
            type="pale-text"
            theme="body"
            :disabled="
              toMonthNumber(innerCurrentDate) <= toMonthNumber(minDate)
            "
            @click="onPrevMonthClick"
          >
            <Icon name="left" size="32rpx" />
          </Button>
          <Button type="pale-text" theme="body" @click="onMonthClick">
            {{
              t('monthTitle', {
                year: innerCurrentDate.getFullYear(),
                month: String(innerCurrentDate.getMonth() + 1).padStart(2, '0'),
              })
            }}
          </Button>
          <Button
            type="pale-text"
            theme="body"
            :disabled="
              toMonthNumber(innerCurrentDate) >= toMonthNumber(maxDate)
            "
            @click="onNextMonthClick"
          >
            <Icon name="right" size="32rpx" />
          </Button>
        </view>
      </view>
      <view :class="bem.e('week')">
        <view v-for="(item, i) in weeks" :key="i" :class="bem.e('week-item')">
          {{ t(`weeks.${item}`) }}
        </view>
      </view>
    </view>
    <scroll-view :scroll-y="severalMonths" :class="bem.e('body')">
      <Month
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
        @day-click="handleDayClick"
      />
    </scroll-view>
  </view>

  <Popout
    v-if="!severalMonths"
    v-model:visible="pickerVisible"
    type="compact"
    @confirm="onPickerConfirm"
  >
    <DatetimePicker
      type="yM"
      v-model="pickerValue"
      :min="minDate"
      :max="maxDate"
    />
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
} from '../utils'
import {
  calendarProps,
  getMaxDate,
  getMinDate,
  sortDates,
  weeksIndex,
} from './common'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { useTranslate } from '../locale'
import Month from './month.vue'
import Popout from '../popout/popout.vue'
import DatetimePicker from '../datetime-picker/datetime-picker.vue'

const props = defineProps(calendarProps)

const emit = defineEmits(['update:model-value'])

const bem = createBem('calendar')

// main
const { t } = useTranslate('calendar')

const minDate = computed(() => {
  return props.min || getMinDate(props.severalMonths)
})

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate(props.severalMonths)
  return maxDate.getTime() < minDate.value.getTime()
    ? new Date(minDate.value)
    : maxDate
})

const innerValue = ref<Date | Date[] | undefined>(
  props.modelValue ?? (props.type === 'single' ? undefined : []),
)

watch(
  () => props.modelValue,
  () => {
    if (innerValue.value !== props.modelValue) {
      innerValue.value =
        props.modelValue ?? (props.type === 'single' ? undefined : [])
    }
  },
)

const innerCurrentDate = ref(
  minmaxDate(props.currentDate || new Date(), minDate.value, maxDate.value),
)

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

  const months = (maxYear - minYear) * 12 + (maxMonth - minMonth)

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

const handleDayClick = (date: Date) => {
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
    emit('update:model-value', nextValue)
  }
}

// others
const calendarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('several', props.severalMonths),
    props.rootClass,
  )
})

const calendarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
