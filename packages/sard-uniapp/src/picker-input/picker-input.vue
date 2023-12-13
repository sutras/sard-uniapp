<template>
  <PopoutInput
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    @clear="onClear"
    @click="onInputClick"
    :validate-event="validateEvent"
  />

  <Popout
    :root-class="rootClass"
    :root-style="rootStyle"
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <Picker
        v-if="already"
        :model-value="popoutValue"
        @update:model-value="onChange"
        :columns="columns"
        :option-keys="optionKeys"
        :immediate-change="immediateChange"
      />
    </template>
  </Popout>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import Popout from '../popout/popout.vue'
import Picker from '../picker/picker.vue'
import {
  defaultOptionKeys,
  getIndexesByValue,
  getInitialValue,
  getOptionsByIndexes,
  getValueOrLabelByOption,
  type PickerOption,
  type PickerOptionKeys,
} from '../picker/common'
import { type TransitionHookName } from '../use'
import { isNullish, toArray } from '../utils'
import { pickerInputProps } from './common'

const props = defineProps(pickerInputProps)

const emit = defineEmits(['update:visible', 'update:model-value'])

// main
const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const popoutValue = ref(props.modelValue)

const onChange = (value: any) => {
  popoutValue.value = value
}

const onVisibleHook = (name: TransitionHookName) => {
  if (
    name === 'enter' &&
    !isNullish(innerValue.value) &&
    innerValue.value !== '' &&
    popoutValue.value !== innerValue.value
  ) {
    popoutValue.value = innerValue.value
  }
}

const onConfirm = () => {
  if (isNullish(popoutValue.value) || popoutValue.value === '') {
    popoutValue.value = getInitialValue(props.columns, fieldKeys.value)
  }

  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)

  inputValue.value = getInputValue()
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
