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
import { watch, ref, computed } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimeRangePicker from '../datetime-range-picker/datetime-range-picker.vue'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
  defaultDatetimeRangePickerInputProps,
} from './common'
import { useFormItemContext } from '../form/common'
import { formatDate, isNullish, toDate } from '../../utils'
import {
  getInitialValue,
  getMaxDate,
  getMinDate,
} from '../datetime-picker/common'

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

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  emit('update:visible', innerVisible.value)
})

// value
const formItemContext = useFormItemContext()

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

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: (Date | string)[]) => {
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
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const onConfirm = () => {
  if (!popoutValue.value) {
    const initialValue = getInitialValue(minDate.value, maxDate.value)
    const singleValue = props.valueFormat
      ? formatDate(initialValue, props.valueFormat)
      : initialValue

    popoutValue.value = [singleValue, singleValue]
  }

  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }
}
</script>
