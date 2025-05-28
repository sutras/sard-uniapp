<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    multiline
    :root-class="rootClass"
    :root-style="rootStyle"
    @clear="onClear"
    @click="onInputClick"
  >
    <sar-checkbox-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      :title="title ?? placeholder"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :size="size"
      :type="type"
      :checkedColor="checkedColor"
      :direction="direction"
      :options="options"
      :option-keys="optionKeys"
      :validate-event="validateEvent"
      @change="onChange"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCheckboxPopout from '../checkbox-popout/checkbox-popout.vue'
import {
  type CheckboxGroupOptionKeys,
  defaultOptionKeys,
} from '../checkbox/common'
import {
  type CheckboxInputProps,
  type CheckboxInputEmits,
  type CheckboxInputOption,
  defaultCheckboxInputProps,
} from './common'
import { getMayPrimitiveOption, isNullish } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CheckboxInputProps>(),
  defaultCheckboxInputProps(),
)

const emit = defineEmits<CheckboxInputEmits>()

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
const innerValue = ref(props.modelValue)

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

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
  options: CheckboxInputOption[],
  optionKeys: Required<CheckboxGroupOptionKeys>,
  value: any[],
) {
  return options
    .filter((option) =>
      value.includes(getMayPrimitiveOption(option, optionKeys.value)),
    )
    .map((option) => getMayPrimitiveOption(option, optionKeys.label))
    .join(', ')
}

function getInputValue() {
  if (isNullish(innerValue.value) || innerValue.value.length === 0) {
    return ''
  }
  return getOutletText(props.options, fieldKeys.value, innerValue.value)
}

watch(
  [innerValue, () => props.options],
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
