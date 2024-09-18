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
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        :model-value="popoutValue"
        @update:model-value="onChange"
        :type="type"
        :min="min"
        :max="max"
        :filter="filter"
        :formatter="formatter"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'
import { formatDate, isNullish } from '../../utils'
import { TransitionHookName } from '../../use'
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
  defaultDatetimePickerInputProps,
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

const onChange = (value: Date) => {
  popoutValue.value = value
}

const onVisibleHook = (name: TransitionHookName) => {
  if (
    name === 'enter' &&
    !isNullish(innerValue.value) &&
    popoutValue.value !== innerValue.value
  ) {
    popoutValue.value = innerValue.value
  }
}

const minDate = computed(() => props.min || getMinDate())

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate()
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const onConfirm = () => {
  if (isNullish(popoutValue.value)) {
    popoutValue.value = getInitialValue(minDate.value, maxDate.value)
  }

  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)

  inputValue.value = getInputValue()
}

// input
const inputValue = ref('')

function getOutletText(value: Date) {
  if (!value) {
    return ''
  }

  return formatDate(
    value,
    props.outletFormat ||
      mapTypeFormat[props.type as keyof typeof mapTypeFormat],
  )
}

function getInputValue() {
  if (isNullish(innerValue.value)) {
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
