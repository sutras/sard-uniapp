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
import { isEmptyBinding, toDate } from '../../utils'
import {
  getMaxDate,
  getMinDate,
  normalizeRangeValue,
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
      if (
        !popoutValue.value ||
        (Array.isArray(popoutValue.value) &&
          popoutValue.value.filter(Boolean).length < 2)
      ) {
        popoutValue.value = normalizeRangeValue(
          minDate.value,
          maxDate.value,
          popoutValue.value,
          props.valueFormat,
        )
      }
    },
  })

const onEnter = () => {
  if (
    !isEmptyBinding(innerValue.value) &&
    popoutValue.value !== innerValue.value
  ) {
    popoutValue.value = innerValue.value
  }
}
</script>
