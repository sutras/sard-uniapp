<template>
  <sar-picker
    :root-class="classNames(rootClass)"
    :root-style="stringifyStyle(rootStyle)"
    :columns="columns"
    :model-value="pickerValue"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  formatDate,
  lunarToSolar,
  solarToLunar,
  stringifyStyle,
  toDate,
} from '../../utils'
import SarPicker from '../picker/picker.vue'
import {
  type DatetimePickerProps,
  type DatetimePickerSlots,
  type DatetimePickerEmits,
  type DatetimeLetter,
  type DateEvery,
  type DatetimeColumnOption,
  correctDate,
  getBoundaryValue,
  getMaxDate,
  getMinDate,
  letterArray,
  strategies,
  getColumnData,
  defaultDatetimePickerProps,
} from './common'
import { useTranslate } from '../locale'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimePickerProps>(),
  defaultDatetimePickerProps,
)

defineSlots<DatetimePickerSlots>()

const emit = defineEmits<DatetimePickerEmits>()

// main
const { t } = useTranslate('datetimePicker')

// utils
const createColumnData = (types: DatetimeLetter[], currentDate: Date) => {
  minValues = getBoundaryValue(
    props.calendar,
    false,
    minDate.value,
    currentDate,
  )
  maxValues = getBoundaryValue(props.calendar, true, maxDate.value, currentDate)

  const getColumnDataByType = (letter: DatetimeLetter) => {
    const strategy = strategies[letter]
    const index = strategy[0]

    return getColumnData(
      props.calendar,
      minValues[index],
      maxValues[index],
      strategy[1],
      letter,
      currentDate,
      t,
      props.filter,
      props.formatter,
    )
  }

  return types.map(
    (letter) =>
      (columnsMap[letter] = getColumnDataByType(letter as DatetimeLetter)),
  )
}

const getChangedLetter = (currentDate: Date) => {
  const min = getBoundaryValue(
    props.calendar,
    false,
    minDate.value,
    currentDate,
  )
  const max = getBoundaryValue(props.calendar, true, maxDate.value, currentDate)

  return letterArray.filter(
    (_, i) => min[i] !== minValues[i] || max[i] !== maxValues[i],
  )
}

let lunarYearChanged = false

const updateColumns = (currentDate: Date) => {
  const changedLetter = getChangedLetter(currentDate)

  if (
    props.calendar === 'lunar' &&
    !changedLetter.includes('M') &&
    innerType.value.includes('M') &&
    lunarYearChanged
  ) {
    changedLetter.push('M')
    lunarYearChanged = false
  }

  if (changedLetter.length) {
    const changedColumns = createColumnData(changedLetter, currentDate)
    const nextColumns = innerType.value.map((letter) => {
      for (let i = 0, l = changedLetter.length; i < l; i++) {
        if (changedLetter[i] === letter) {
          return changedColumns[i]
        }
      }
      return columnsMap[letter]
    })

    columns.value = nextColumns
  }
}

const getDateByPickerValue = (value: number[]) => {
  let currEvery: number[]

  if (props.calendar === 'solar') {
    currEvery = letterArray.map((letter) => {
      const stratery = strategies[letter]
      for (let i = 0, l = innerType.value.length; i < l; i++) {
        if (innerType.value[i] === letter) {
          return value[i]
        }
      }
      return stratery[4](innerValue.value)
    })
  } else {
    const lunarDate = solarToLunar(
      innerValue.value.getFullYear(),
      innerValue.value.getMonth(),
      innerValue.value.getDate(),
    )

    const yearIndex = innerType.value.indexOf('y')
    if (yearIndex !== -1) {
      lunarYearChanged = lunarDate.year !== value[yearIndex]
    }

    currEvery = letterArray.map((letter) => {
      for (let i = 0, l = innerType.value.length; i < l; i++) {
        if (innerType.value[i] === letter) {
          return value[i]
        }
      }

      switch (letter) {
        case 'y':
          return lunarDate.year
        case 'M':
          return lunarDate.month
        case 'd':
          return lunarDate.day
        default:
          return strategies[letter][4](innerValue.value)
      }
    })
  }

  correctDate(
    props.calendar,
    currEvery as DateEvery,
    minDate.value,
    maxDate.value,
  )

  let date: Date
  if (props.calendar === 'solar') {
    currEvery[1]--
    date = new Date(...(currEvery as DateEvery))
  } else {
    const solarDate = lunarToSolar(currEvery[0], currEvery[1], currEvery[2])
    date = new Date(
      solarDate.year,
      solarDate.month - 1,
      solarDate.day,
      currEvery[3],
      currEvery[4],
      currEvery[5],
    )
  }

  return date
}

const normalizeValue = (value: Date | string | undefined | null) => {
  const date = value ? toDate(value, props.valueFormat) : new Date()
  return date < minDate.value
    ? new Date(minDate.value)
    : date > maxDate.value
      ? new Date(maxDate.value)
      : date
}

// main
const innerType = computed(() => {
  return props.type.split('') as DatetimeLetter[]
})

const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate())
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const innerValue = ref(normalizeValue(props.modelValue))

let currentEmitValue: string | Date = innerValue.value

watch(
  () => props.modelValue,
  () => {
    if (currentEmitValue !== props.modelValue) {
      innerValue.value = normalizeValue(props.modelValue)

      if (props.modelValue) {
        updateColumns(innerValue.value)
      }
    }
  },
)

const emitChange = () => {
  const emitValue = props.valueFormat
    ? formatDate(innerValue.value, props.valueFormat)
    : innerValue.value

  currentEmitValue = emitValue

  emit('update:model-value', emitValue)
  emit('change', emitValue)
}

watch([minDate, maxDate], () => {
  const oldDate = toDate(innerValue.value, props.valueFormat)
  const value = normalizeValue(innerValue.value)

  innerValue.value = value
  updateColumns(value)
  if (value.getTime() !== oldDate.getTime()) {
    emitChange()
  }
})

const pickerValue = computed(() => {
  if (props.calendar === 'solar') {
    return innerType.value.map((letter) => {
      return strategies[letter][4](innerValue.value)
    })
  } else {
    const lunarDate = solarToLunar(
      innerValue.value.getFullYear(),
      innerValue.value.getMonth(),
      innerValue.value.getDate(),
    )

    return innerType.value.map((letter) => {
      switch (letter) {
        case 'y':
          return lunarDate.year
        case 'M':
          return lunarDate.month
        case 'd':
          return lunarDate.day
        default:
          return strategies[letter][4](innerValue.value)
      }
    })
  }
})

const columnsMap: { [p: string]: DatetimeColumnOption[] } = {}

let minValues: number[] = []
let maxValues: number[] = []

const columns = ref(createColumnData(innerType.value, innerValue.value))

const onChange = (value: number[]) => {
  // 快速滑动有概率得到undefine，需要确保为数值
  value = value.map((item) => item || 0)
  const nextValue = getDateByPickerValue(value)
  innerValue.value = nextValue
  updateColumns(nextValue)
  emitChange()
}
</script>
