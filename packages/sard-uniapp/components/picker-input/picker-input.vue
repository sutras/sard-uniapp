<template>
  <sar-popout-input
    v-bind="popoutInputProps"
    v-model="inputValue"
    @clear="onClear"
    @click="onClick"
  >
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template #arrow>
      <slot name="arrow"></slot>
    </template>
    <sar-picker-popout
      v-bind="omittedProps"
      v-model:visible="innerVisible"
      v-model="innerValue"
      keep-render
      :internal-custom="$slots.custom ? 1 : 0"
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
import { watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPickerPopout from '../picker-popout/picker-popout.vue'
import {
  getIndexesByValue,
  getOptionsByIndexes,
  type PickerOption,
} from '../picker/common'
import { isEmptyArray, isEmptyBinding, toArray } from '../../utils'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  useOptionKeys,
  usePopoutInput,
} from '../../use'
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

const slots = defineSlots<PickerInputSlots>()

const emit = defineEmits<PickerInputEmits>()

// main
const useOptionKeysReturn = useOptionKeys(props)

const popoutInputProps = pickPopoutInputProps(props, slots)

const omittedProps = omitPopoutInputProps(props, ['internalCustom'])

const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

const { getLabel } = useOptionKeysReturn

const onClick = () => {
  if (props.columns && props.columns.length > 0) {
    show()
  }
}

function getOutletText(
  columns: PickerOption[] | PickerOption[][],
  value: string | number,
) {
  const indexes = getIndexesByValue(
    toArray(value),
    columns || [],
    useOptionKeysReturn,
  )
  const options = getOptionsByIndexes(
    indexes,
    columns || [],
    useOptionKeysReturn,
  )

  const labels = options.map((option) => getLabel(option))

  return labels.join('/')
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.columns, innerValue.value)
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
