<template>
  <view :class="dateStripClass" :style="dateStripStyle">
    <scroll-view
      :id="scrollId"
      :class="bem.e('scroll')"
      scroll-x
      :scroll-left="scrollLeft"
      :scroll-with-animation="scrollInitialized"
    >
      <view :id="wrapperId" :class="bem.e('content')">
        <view
          v-for="item in daysInfo"
          :id="item.id"
          :key="item.key"
          :class="item.className"
          :style="item.style"
          @click="onDayClick(item.day)"
        >
          <view :class="bem.e('item-week')">
            {{ item.day.top }}
          </view>
          <view :class="bem.e('item-day')">
            {{ item.day.text }}
          </view>
          <view
            v-if="type === 'range' || item.day.bottom"
            :class="bem.e('item-info')"
          >
            {{ item.day.bottom || '&nbsp;' }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  ref,
  shallowRef,
  toRaw,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  minmaxDate,
  toDateNumber,
  parseDate,
  formatDate,
  uniqid,
  getBoundingClientRect,
  solarToLunar,
  getLunarDayName,
  getLunarMonthName,
} from '../../utils'
import { useTranslate } from '../locale'
import {
  type DateStripProps,
  type DateStripEmits,
  defaultDateStripProps,
  getMaxDate,
  getMinDate,
  sortDates,
} from './common'
import { type CalendarDay } from '../calendar'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DateStripProps>(),
  defaultDateStripProps(),
)

const emit = defineEmits<DateStripEmits>()

const bem = createBem('date-strip')

const { t, select } = useTranslate('calendar')

const instance = getCurrentInstance()
const scrollId = uniqid()
const wrapperId = uniqid()

const getAnchorDate = () => {
  return props.currentDate || new Date()
}

const minDate = computed(() => {
  return props.min || getMinDate(getAnchorDate())
})

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate(getAnchorDate())

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

const innerValue = shallowRef<Date | Date[] | undefined>(
  normalizeValue(props.modelValue),
)

let currentEmitValue: string | string[] | Date | Date[] | undefined =
  innerValue.value

watch(
  () => toRaw(props.modelValue),
  (value) => {
    if (currentEmitValue !== value) {
      innerValue.value = normalizeValue(value)
      currentEmitValue = value
      canScrollCenter.value = true
    }
  },
)

const innerCurrentDate = shallowRef(
  minmaxDate(getAnchorDate(), minDate.value, maxDate.value),
)

watch(
  () => props.currentDate,
  () => {
    innerCurrentDate.value = minmaxDate(
      getAnchorDate(),
      minDate.value,
      maxDate.value,
    )
  },
)

watch([minDate, maxDate], () => {
  innerCurrentDate.value = minmaxDate(
    innerCurrentDate.value,
    minDate.value,
    maxDate.value,
  )
})

watch(innerValue, () => {
  const onlyOneDate = Array.isArray(innerValue.value)
    ? innerValue.value.length === 1
      ? innerValue.value[0]
      : undefined
    : innerValue.value

  if (onlyOneDate) {
    innerCurrentDate.value = minmaxDate(
      onlyOneDate,
      minDate.value,
      maxDate.value,
    )
  }
})

const startDate = shallowRef(
  props.type === 'range' &&
    Array.isArray(innerValue.value) &&
    innerValue.value.length === 1
    ? innerValue.value[0]
    : undefined,
)

const currentDates = computed(() => {
  if (props.type === 'range' && startDate.value) {
    return [startDate.value]
  }

  if (Array.isArray(innerValue.value)) {
    return innerValue.value
  }

  return innerValue.value ? [innerValue.value] : []
})

const getDefaultLunarLabel = (date: Date) => {
  const lunarDate = solarToLunar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )

  return lunarDate.day === 1
    ? getLunarMonthName(Math.abs(lunarDate.month), lunarDate.month < 0)
    : getLunarDayName(lunarDate.day)
}

const daysInfo = computed(() => {
  const todayNumber = toDateNumber(new Date())
  const dates: Date[] = []
  const cursor = new Date(minDate.value)

  while (cursor.getTime() <= maxDate.value.getTime()) {
    dates.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
    .filter((date) => {
      return props.filter ? props.filter(date) : true
    })
    .map((date) => {
      const dateNumber = toDateNumber(date)
      const selected =
        props.type !== 'range' &&
        currentDates.value.some((item) => toDateNumber(item) === dateNumber)

      const isStart =
        props.type === 'range' &&
        currentDates.value[0] &&
        toDateNumber(currentDates.value[0]) === dateNumber

      const isEnd =
        props.type === 'range' &&
        currentDates.value[1] &&
        toDateNumber(currentDates.value[1]) === dateNumber

      const isMiddle =
        props.type === 'range' &&
        currentDates.value.length === 2 &&
        dateNumber > toDateNumber(currentDates.value[0]) &&
        dateNumber < toDateNumber(currentDates.value[1])

      const d = date.getDay()
      const week = select(`abbrWeeks.${d}`) || select(`weeks.${d}`)

      const day: CalendarDay = {
        date,
        disabled: !!props.disabledDate?.(date),
        top: week,
        text: formatDate(date, 'MM-DD'),
        bottom:
          isStart && isEnd
            ? props.sameDateText || `${t('start')}/${t('end')}`
            : isStart
              ? props.startDateText || t('start')
              : isEnd
                ? props.endDateText || t('end')
                : props.showLunar
                  ? getDefaultLunarLabel(date)
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
        today: todayNumber === dateNumber,
      }

      props.formatter?.(day)

      return {
        id: `${scrollId}-${dateNumber}`,
        key: dateNumber,
        day,
        style: stringifyStyle(day.style),
        className: classNames(
          bem.e('item'),
          bem.em('item', day.type, day.type !== 'normal'),
          bem.em('item', 'disabled', day.disabled),
          bem.em('item', 'today', day.today),
          day.className,
        ),
      }
    })
})

const onDayClick = (day: CalendarDay) => {
  if (day.disabled) {
    return
  }

  let nextValue: Date | Date[] | undefined

  if (props.type === 'single') {
    nextValue = day.date
  } else if (props.type === 'multiple') {
    if (Array.isArray(innerValue.value)) {
      if (
        innerValue.value.some(
          (item) => toDateNumber(item) === toDateNumber(day.date),
        )
      ) {
        nextValue = innerValue.value.filter(
          (item) => toDateNumber(item) !== toDateNumber(day.date),
        )
      } else {
        if (innerValue.value.length >= props.maxDays) {
          props.overMaxDays?.()
          return
        }
        nextValue = sortDates(innerValue.value.concat(day.date))
      }
    }
  } else if (props.type === 'range') {
    if (startDate.value) {
      const startDays = toDateNumber(startDate.value)
      const endDays = toDateNumber(day.date)

      if (!props.allowSameDay && startDays === endDays) {
        return
      }

      if (endDays < startDays) {
        startDate.value = day.date
        return
      }

      let endDate = day.date

      if (endDays - startDays + 1 > props.maxDays) {
        props.overMaxDays?.()
        endDate = new Date(startDate.value)
        endDate.setDate(endDate.getDate() + (props.maxDays - 1))
      }

      nextValue = [startDate.value, endDate]
    } else {
      nextValue = []
    }

    startDate.value = startDate.value ? undefined : day.date
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

// ========================== 滚动居中 ==========================
const getCenterDate = () => {
  const dates = currentDates.value

  if (dates.length === 2 && props.type === 'range') {
    const middle = new Date(dates[0])
    const diff = Math.floor(
      (dates[1].getTime() - dates[0].getTime()) / (24 * 60 * 60 * 1000) / 2,
    )
    middle.setDate(middle.getDate() + diff)
    return middle
  }

  return dates[0] || innerCurrentDate.value
}

const scrollLeft = ref(0)
const scrollInitialized = ref(false)
const canScrollCenter = ref(true)
let scrollTimer: ReturnType<typeof setTimeout> | undefined

const scrollToCenterDate = async () => {
  const centerDate = getCenterDate()
  const targetId = `${scrollId}-${toDateNumber(centerDate)}`

  const [scrollRect, wrapperRect, itemRect] = await Promise.all([
    getBoundingClientRect(`#${scrollId}`, instance),
    getBoundingClientRect(`#${wrapperId}`, instance),
    getBoundingClientRect(`#${targetId}`, instance),
  ])

  if (!scrollRect.width || !itemRect.width) {
    return
  }

  const nextScrollLeft = Math.max(
    0,
    itemRect.left - wrapperRect.left - (scrollRect.width - itemRect.width) / 2,
  )
  scrollLeft.value =
    scrollLeft.value !== nextScrollLeft ? nextScrollLeft : nextScrollLeft + 0.1

  canScrollCenter.value = false

  if (!scrollInitialized.value) {
    setTimeout(() => {
      scrollInitialized.value = true
    }, 30)
  }
}

const queueScroll = () => {
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  nextTick(() => {
    scrollTimer = setTimeout(() => {
      scrollToCenterDate()
    }, 30)
  })
}

onBeforeUnmount(() => {
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})

watch(
  [daysInfo, currentDates, innerCurrentDate],
  () => {
    if (props.type === 'single' || canScrollCenter.value) {
      queueScroll()
    }
  },
  {
    immediate: true,
  },
)

// other
const dateStripClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const dateStripStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
