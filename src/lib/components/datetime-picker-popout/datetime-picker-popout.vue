<template>
  <sar-popout
    v-model:visible="innerVisible"
    keep-render
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @enter="onEnter"
  >
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        :model-value="popoutValue"
        :type="type"
        :min="min"
        :max="max"
        :filter="filter"
        :formatter="formatter"
        :value-format="valueFormat"
        :calendar="calendar"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'
import {
  type DatetimePickerPopoutProps,
  type DatetimePickerPopoutSlots,
  type DatetimePickerPopoutEmits,
  defaultDatetimePickerPopoutProps,
} from './common'
import { formatDate, isNullish, toDate } from '../../utils'
import {
  getInitialValue,
  getMaxDate,
  getMinDate,
} from '../datetime-picker/common'
import { useFormPopout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimePickerPopoutProps>(),
  defaultDatetimePickerPopoutProps(),
)

defineSlots<DatetimePickerPopoutSlots>()

const emit = defineEmits<DatetimePickerPopoutEmits>()

// main
const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate())
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const { innerVisible, innerValue, popoutValue, onChange, onConfirm } =
  useFormPopout(props, emit, {
    onConfirmBefore() {
      if (!popoutValue.value) {
        const initialValue = getInitialValue(minDate.value, maxDate.value)
        popoutValue.value = props.valueFormat
          ? formatDate(initialValue, props.valueFormat)
          : initialValue
      }
    },
  })

const onEnter = () => {
  if (!isNullish(innerValue.value) && popoutValue.value !== innerValue.value) {
    popoutValue.value = innerValue.value
  }
}

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
</script>
