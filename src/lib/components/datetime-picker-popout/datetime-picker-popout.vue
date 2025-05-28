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
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'
import {
  type DatetimePickerPopoutProps,
  type DatetimePickerPopoutSlots,
  type DatetimePickerPopoutEmits,
  defaultDatetimePickerPopoutProps,
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
  defineProps<DatetimePickerPopoutProps>(),
  defaultDatetimePickerPopoutProps(),
)

defineSlots<DatetimePickerPopoutSlots>()

const emit = defineEmits<DatetimePickerPopoutEmits>()

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

  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }
}
</script>
