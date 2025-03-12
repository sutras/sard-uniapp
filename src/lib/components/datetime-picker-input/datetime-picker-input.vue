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
    keep-render
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    @confirm="onConfirm"
    @enter="onEnter"
  >
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        :model-value="popoutValue"
        @change="onChange"
        :type="type"
        :min="min"
        :max="max"
        :filter="filter"
        :formatter="formatter"
        :value-format="valueFormat"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'
import { formatDate, isNullish, isString, parseDate, toDate } from '../../utils'
import {
  getInitialValue,
  getMinDate,
  getMaxDate,
} from '../datetime-picker/common'
import {
  type DatetimePickerInputProps,
  type DatetimePickerInputEmits,
  defaultDatetimePickerInputProps,
  mapTypeFormat,
} from './common'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimePickerInputProps>(),
  defaultDatetimePickerInputProps(),
)

const emit = defineEmits<DatetimePickerInputEmits>()

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

const onChange = (value: Date | string) => {
  popoutValue.value = value
}

const onEnter = () => {
  if (!isNullish(innerValue.value) && popoutValue.value !== innerValue.value) {
    popoutValue.value = innerValue.value
  }
}

const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate())
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const normalizeValue = (value: Date | string | undefined | null) => {
  const date = value ? toDate(value, props.valueFormat) : new Date()
  return date < minDate.value
    ? new Date(minDate.value)
    : date > maxDate.value
    ? new Date(maxDate.value)
    : date
}

watch([minDate, maxDate], () => {
  if (innerValue.value) {
    const oldDate = toDate(innerValue.value, props.valueFormat)
    const value = normalizeValue(innerValue.value)

    if (value.getTime() !== oldDate.getTime()) {
      popoutValue.value = value
      onConfirm()
    }
  }
})

const onConfirm = () => {
  if (!popoutValue.value) {
    const initialValue = getInitialValue(minDate.value, maxDate.value)
    popoutValue.value = props.valueFormat
      ? formatDate(initialValue, props.valueFormat)
      : initialValue
  }

  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)
  emit('change', popoutValue.value)

  inputValue.value = getInputValue()
}

// input
const inputValue = ref('')

function getOutletText(value: Date | string) {
  if (isString(value) && props.valueFormat) {
    value = parseDate(value, props.valueFormat)
  }
  if (value instanceof Date) {
    return formatDate(
      value,
      props.outletFormat ||
        mapTypeFormat[props.type as keyof typeof mapTypeFormat],
    )
  }
  return value
}

function getInputValue() {
  if (!innerValue.value) {
    return ''
  }
  return getOutletText(innerValue.value)
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
