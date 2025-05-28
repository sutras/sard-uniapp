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
    @clear="onClear"
    @click="onInputClick"
  >
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
      @select="(option, tabIndex) => $emit('select', option, tabIndex)"
      @change="onChange"
    >
      <template #top="slotProps">
        <slot name="top" v-bind="slotProps"></slot>
      </template>
    </sar-cascader-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCascaderPopout from '../cascader-popout/cascader-popout.vue'
import {
  type CascaderFieldKeys,
  type CascaderOption,
  defaultFieldKeys,
  getSelectedOptionsByValue,
} from '../cascader/common'
import { isNullish } from '../../utils'
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

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  emit('update:model-value', value, selectedOptions)
  emit('change', value, selectedOptions)
}

// input
const inputValue = ref('')

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
    return ''
  }

  const labels = selectedOptions.map((option) => option[fieldKeys.label])

  return labels.join('/')
}

function getInputValue() {
  if (isNullish(innerValue.value) || !props.options) {
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

const onClear = () => {
  inputValue.value = ''
  innerValue.value = undefined
  emit('update:model-value', undefined, [])
  emit('change', undefined, [])
}
</script>
