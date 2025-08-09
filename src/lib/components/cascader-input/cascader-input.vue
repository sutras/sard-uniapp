<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :loading="loading"
    :root-class="rootClass"
    :root-style="rootStyle"
    :internal-arrow="$slots.arrow ? 1 : 0"
    :input-props="inputProps"
    @clear="onClear"
    @click="show"
  >
    <template v-if="$slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
    <sar-cascader-popout
      v-model:visible="innerVisible"
      v-model="innerValue"
      :title="title ?? placeholder"
      :show-confirm="showConfirm"
      :root-class="popoutClass"
      :root-style="popoutStyle"
      :options="options"
      :field-keys="fieldKeys"
      :hint-text="hintText"
      :change-on-select="changeOnSelect"
      :label-render="labelRender"
      :validate-event="validateEvent"
      :resettable="resettable"
      @select="(option, tabIndex) => $emit('select', option, tabIndex)"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template #top="{ tabIndex }">
        <slot name="top" :tab-index="tabIndex"></slot>
      </template>
    </sar-cascader-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCascaderPopout from '../cascader-popout/cascader-popout.vue'
import {
  type CascaderFieldKeys,
  type CascaderOption,
  defaultFieldKeys,
  getSelectedOptionsByValue,
} from '../cascader/common'
import { isEmptyBinding } from '../../utils'
import { usePopoutInput } from '../../use'
import {
  type CascaderInputProps,
  type CascaderInputSlots,
  type CascaderInputEmits,
  defaultCascaderInputProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CascaderInputProps>(),
  defaultCascaderInputProps(),
)

defineSlots<CascaderInputSlots>()

const emit = defineEmits<CascaderInputEmits>()

// main
const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit, {
  onClear(value) {
    emit('update:model-value', value, [])
    emit('change', value, [])
  },
})

const fieldkeys = computed(() => {
  return Object.assign(
    {},
    defaultFieldKeys,
    props.fieldKeys,
  ) as Required<CascaderFieldKeys>
})

function getOutletText(
  options: CascaderOption[],
  value: string | number,
  fieldKeys: Required<CascaderFieldKeys>,
): string {
  const selectedOptions = getSelectedOptionsByValue(options, value, fieldKeys)

  if (!selectedOptions) {
    return isEmptyBinding(value) ? '' : String(value)
  }

  const labels = selectedOptions.map((option) => option[fieldKeys.label])

  return labels.join('/')
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || !props.options) {
    return ''
  }
  return getOutletText(props.options, innerValue.value, fieldkeys.value)
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

const onConfirm = () => {
  emit('confirm')
}
</script>
