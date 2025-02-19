<template>
  <view :class="bem.e('month')">
    <view v-if="severalMonths" :class="bem.e('month-title')">
      {{
        t('monthTitle', {
          year,
          month: month + 1,
        })
      }}
    </view>
    <view :class="bem.e('days')">
      <view
        v-for="(item, i) in daysInfo"
        :key="i"
        :class="item.className"
        :style="item.style"
        @click="onDayClick(item.day)"
      >
        <view v-if="item.day.top" :class="bem.e('top')">
          {{ item.day.top }}
        </view>
        {{ item.day.text }}
        <view v-if="item.day.bottom" :class="bem.e('bottom')">
          {{ item.day.bottom }}
        </view>
      </view>

      <view :class="bem.e('mark')">{{ month + 1 }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  getDaysInMonth,
  getOffsetDaysFromFirstDay,
  getDayOnFirstOfMonth,
  getPadStartDays,
  getPadEndDays,
  toDateNumber,
  stringifyStyle,
  classNames,
} from '../../utils'
import {
  type CalendarMonthProps,
  type CalendarMonthEmits,
  type CalendarDay,
} from '../calendar/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CalendarMonthProps>(), {})

const emit = defineEmits<CalendarMonthEmits>()

// main
const days = computed(() => {
  return getDaysInMonth(props.year, props.month)
})

const offsetDays = computed(() => {
  return getOffsetDaysFromFirstDay(
    getDayOnFirstOfMonth(props.year, props.month),
    props.weekStartsOn,
  )
})

const allDays = computed(() => {
  const currentDays = Array(days.value)
    .fill(0)
    .map((_, i) => new Date(props.year, props.month, i + 1))

  if (props.severalMonths) {
    return currentDays
  }

  const padStartDays = getPadStartDays(
    props.year,
    props.month,
    offsetDays.value,
  )

  const padEndDays = getPadEndDays(
    props.year,
    props.month,
    42 - offsetDays.value - days.value,
  )

  return [...padStartDays, ...currentDays, ...padEndDays]
})

function withinMonth(i: number) {
  return props.severalMonths
    ? true
    : i >= offsetDays.value && i < offsetDays.value + days.value
}

const types = {
  same: 'same',
  start: 'start',
  middle: 'middle',
  end: 'end',
  selected: 'selected',
  normal: 'normal',
}

const daysInfo = computed(() => {
  return allDays.value.map((date, i) => {
    const dateNumber = toDateNumber(date)
    const within = withinMonth(i)

    let disabled = false

    if (!within) {
      disabled = true
    } else {
      if (props.disabledDate) {
        disabled = props.disabledDate(date)
      }

      if (
        dateNumber < toDateNumber(props.minDate) ||
        dateNumber > toDateNumber(props.maxDate)
      ) {
        disabled = true
      }
    }

    const selected =
      within &&
      props.type !== 'range' &&
      props.currentDates.some((d) => toDateNumber(d) === dateNumber)

    const isStart =
      within &&
      props.type === 'range' &&
      props.currentDates[0] &&
      toDateNumber(props.currentDates[0]) === dateNumber

    const isEnd =
      within &&
      props.type === 'range' &&
      props.currentDates[1] &&
      toDateNumber(props.currentDates[1]) === dateNumber

    const isMiddle =
      within &&
      props.type === 'range' &&
      props.currentDates.length === 2 &&
      dateNumber > toDateNumber(props.currentDates[0]) &&
      dateNumber < toDateNumber(props.currentDates[1])

    const day: CalendarDay = {
      date,
      disabled,
      top: '',
      text: date.getDate() + '',
      bottom:
        isStart && isEnd
          ? `${props.t('start')}/${props.t('end')}`
          : isStart
          ? props.t('start')
          : isEnd
          ? props.t('end')
          : '',
      type:
        isStart && isEnd
          ? 'same'
          : isStart
          ? 'start'
          : isMiddle
          ? 'middle'
          : isEnd
          ? 'end'
          : selected
          ? 'selected'
          : 'normal',
    }

    if (within && props.formatter) {
      props.formatter(day)
    }

    const type = types[day.type]

    return {
      day,
      style: stringifyStyle(day.style, {
        marginLeft:
          props.severalMonths && i === 0
            ? (offsetDays.value / 7) * 100 + '%'
            : null,
      }),
      className: classNames(
        props.bem.e('day'),
        props.bem.em('day', type, type !== 'normal'),
        props.bem.em('day', 'without', !within),
        props.bem.em('day', 'disabled', disabled),
        props.bem.em('day', 'today', props.todayNumber === dateNumber),
        day.className,
      ),
    }
  })
})

const onDayClick = (day: CalendarDay) => {
  if (!day.disabled) {
    emit('day-click', day.date)
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
