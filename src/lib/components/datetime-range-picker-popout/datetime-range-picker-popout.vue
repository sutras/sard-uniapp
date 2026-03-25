<template>
  <sar-popout
    v-model:visible="innerVisible"
    keep-render
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @enter="onEnter"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-datetime-range-picker
        v-if="already"
        v-bind="omittedProps"
        :model-value="popoutValue"
        @change="onChange"
      >
        <template #header>
          <slot name="header"></slot>
        </template>
        <template #footer>
          <slot name="footer"></slot>
        </template>
      </sar-datetime-range-picker>
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
  defaultDatetimeRangePickerPopoutProps,
} from './common'
import { isEmptyBinding, toDate } from '../../utils'
import {
  getMaxDate,
  getMinDate,
  normalizeRangeValue,
} from '../datetime-picker/common'
import { omitFormPopoutProps, useFormPopout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimeRangePickerPopoutProps>(),
  defaultDatetimeRangePickerPopoutProps(),
)

defineSlots<DatetimeRangePickerPopoutSlots>()

const emit = defineEmits<DatetimeRangePickerPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const {
  innerVisible,
  innerValue,
  popoutValue,
  onChange,
  onConfirm,
  onVisibleHook,
} = useFormPopout(props, emit, {
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
