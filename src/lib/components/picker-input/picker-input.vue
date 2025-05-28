<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :root-class="rootClass"
    :root-style="rootStyle"
    @clear="onClear"
    @click="onInputClick"
  >
    <sar-picker-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      keep-render
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :columns="columns"
      :option-keys="optionKeys"
      :immediate-change="immediateChange"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPickerPopout from '../picker-popout/picker-popout.vue'
import {
  defaultOptionKeys,
  getIndexesByValue,
  getOptionsByIndexes,
  getValueOrLabelByOption,
  type PickerOption,
  type PickerOptionKeys,
} from '../picker/common'
import { isNullish, toArray } from '../../utils'
import {
  type PickerInputProps,
  type PickerInputEmits,
  defaultPickerInputProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PickerInputProps>(),
  defaultPickerInputProps(),
)

const emit = defineEmits<PickerInputEmits>()

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

const onInputClick = () => {
  innerVisible.value = true
}

// value
const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const onChange = (value: any) => {
  emit('update:model-value', value)
  emit('change', value)
}

// input
const inputValue = ref('')

function getOutletText(
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
  value: string | number,
) {
  const indexes = getIndexesByValue(toArray(value), columns || [], optionKeys)
  const options = getOptionsByIndexes(indexes, columns || [], optionKeys)

  const labels = options.map((option) =>
    getValueOrLabelByOption(option, optionKeys.label),
  )

  return labels.join('/')
}

function getInputValue() {
  if (isNullish(innerValue.value) || innerValue.value === '') {
    return ''
  }
  return getOutletText(props.columns, fieldKeys.value, innerValue.value)
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
</script>
