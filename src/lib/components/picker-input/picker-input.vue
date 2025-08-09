<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :root-class="rootClass"
    :root-style="rootStyle"
    :arrow="arrow"
    :internal-arrow="$slots.arrow ? 1 : 0"
    :input-props="inputProps"
    :loading="loading"
    @clear="onClear"
    @click="onClick"
  >
    <template v-if="$slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>

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
      :internal-custom="$slots.custom ? 1 : 0"
      :resettable="resettable"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template
        v-if="$slots.custom"
        #custom="{
          columns,
          maskClass,
          pickerViewClass,
          indicatorClass,
          value,
          onChange,
        }"
      >
        <slot
          name="custom"
          :columns="columns"
          :picker-view-class="pickerViewClass"
          :mask-class="maskClass"
          :indicator-class="indicatorClass"
          :value="value"
          :on-change="onChange"
        ></slot>
      </template>
    </sar-picker-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
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
import { isEmptyBinding, toArray } from '../../utils'
import { usePopoutInput } from '../../use'
import {
  type PickerInputProps,
  type PickerInputEmits,
  type PickerInputSlots,
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

defineSlots<PickerInputSlots>()

const emit = defineEmits<PickerInputEmits>()

// main
const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

const onClick = () => {
  if (props.columns && props.columns.length > 0) {
    show()
  }
}

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

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
  if (isEmptyBinding(innerValue.value)) {
    return ''
  }
  return getOutletText(props.columns, fieldKeys.value, innerValue.value)
}

watch(
  [innerValue, () => props.columns],
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = () => {
  emit('confirm')
}
</script>
