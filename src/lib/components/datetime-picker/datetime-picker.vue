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
import { classNames, formatDate, parseDate, stringifyStyle } from '../../utils'
import SarPicker from '../picker/picker.vue'
import {
  type DatetimePickerProps,
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

const emit = defineEmits<DatetimePickerEmits>()

// main
const { t } = useTranslate('datetimePicker')

// utils
const createColumnData = (types: DatetimeLetter[], currentDate: Date) => {
  minValues = getBoundaryValue(false, minDate.value, currentDate)
  maxValues = getBoundaryValue(true, maxDate.value, currentDate)

  const getColumnDataByType = (letter: DatetimeLetter) => {
    const strategy = strategies[letter]
    const index = strategy[0]

    return getColumnData(
      maxValues[index] - minValues[index] + 1,
      minValues[index],
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
  const min = getBoundaryValue(false, minDate.value, currentDate)
  const max = getBoundaryValue(true, maxDate.value, currentDate)

  return letterArray.filter(
    (_, i) => min[i] !== minValues[i] || max[i] !== maxValues[i],
  )
}

const updateColumns = (currentDate: Date) => {
  const changedLetter = getChangedLetter(currentDate)

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
  const currEvery = letterArray.map((letter) => {
    const stratery = strategies[letter]
    for (let i = 0, l = innerType.value.length; i < l; i++) {
      if (innerType.value[i] === letter) {
        return value[i]
      }
    }
    return stratery[4](innerValue.value)
  })
  correctDate(currEvery as DateEvery, minDate.value, maxDate.value)

  currEvery[1]--
  const date = new Date(...(currEvery as DateEvery))

  return date
}

const toDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date
  }
  return parseDate(date, props.valueFormat)
}

const normalizeValue = (value: Date | string | undefined | null) => {
  const date = value ? toDate(value) : new Date()
  return date.getTime() < minDate.value.getTime()
    ? minDate.value
    : date.getTime() > maxDate.value.getTime()
    ? maxDate.value
    : date
}

// main
const innerType = computed(() => {
  return props.type.split('') as DatetimeLetter[]
})

const minDate = computed(() => props.min || getMinDate())

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate()
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

const pickerValue = computed(() => {
  return innerType.value.map((letter) => {
    return strategies[letter][4](innerValue.value)
  })
})

const columnsMap: { [p: string]: DatetimeColumnOption[] } = {}

let minValues: number[] = []
let maxValues: number[] = []

const columns = ref(createColumnData(innerType.value, innerValue.value))

const onChange = (value: number[]) => {
  const nextValue = getDateByPickerValue(value)
  innerValue.value = nextValue

  const emitValue = props.valueFormat
    ? formatDate(nextValue, props.valueFormat)
    : nextValue

  currentEmitValue = emitValue

  updateColumns(nextValue)
  emit('update:model-value', emitValue)
  emit('change', emitValue)
}
</script>
