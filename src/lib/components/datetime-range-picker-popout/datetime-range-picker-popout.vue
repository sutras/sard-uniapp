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
      <sar-datetime-range-picker
        v-if="already"
        :model-value="popoutValue"
        :type="type"
        :min="min"
        :max="max"
        :filter="filter"
        :formatter="formatter"
        :value-format="valueFormat"
        :tabs="tabs"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimeRangePicker from '../datetime-range-picker/datetime-range-picker.vue'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
  defaultDatetimeRangePickerInputProps,
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
  defineProps<DatetimeRangePickerPopoutProps>(),
  defaultDatetimeRangePickerInputProps(),
)

defineSlots<DatetimeRangePickerPopoutSlots>()

const emit = defineEmits<DatetimeRangePickerPopoutEmits>()

// main
const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const { innerVisible, innerValue, popoutValue, onChange, onConfirm } =
  useFormPopout(props, emit, {
    onConfirmBefore() {
      if (!popoutValue.value) {
        const initialValue = getInitialValue(minDate.value, maxDate.value)
        const singleValue = props.valueFormat
          ? formatDate(initialValue, props.valueFormat)
          : initialValue

        popoutValue.value = [singleValue, singleValue]
      }
    },
  })

const onEnter = () => {
  if (!isNullish(innerValue.value) && popoutValue.value !== innerValue.value) {
    popoutValue.value = innerValue.value
  }
}
</script>
