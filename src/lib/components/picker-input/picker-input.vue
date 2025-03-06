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
    keep-render
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-picker
        v-if="already"
        :model-value="popoutValue"
        @change="onChange"
        :columns="columns"
        :option-keys="optionKeys"
        :immediate-change="immediateChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarPicker from '../picker/picker.vue'
import {
  defaultOptionKeys,
  getIndexesByValue,
  getInitialValue,
  getOptionsByIndexes,
  getValueOrLabelByOption,
  type PickerOption,
  type PickerOptionKeys,
} from '../picker/common'
import { type TransitionHookName } from '../../use'
import { isNullish, toArray } from '../../utils'
import {
  type PickerInputProps,
  type PickerInputEmits,
  defaultPickerInputProps,
} from './common'
import { useFormItemContext } from '../form/common'

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
const formItemContext = useFormItemContext()

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

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
  emit('change', popoutValue.value)

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
  emit('change', undefined)
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
