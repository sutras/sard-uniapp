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
    :show-confirm="showConfirm"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <Cascader
        v-if="already"
        :model-value="popoutValue"
        @update:model-value="onChange"
        :options="options"
        :field-names="fieldNames"
        :placeholder="hintText"
        @select="(option, tabIndex) => $emit('select', option, tabIndex)"
      >
        <template #top="{ tabIndex }">
          <slot name="top" :tab-index="tabIndex"></slot>
        </template>
      </Cascader>
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
import Cascader from '../cascader/cascader.vue'
import {
  type CascaderFieldNames,
  type CascaderOption,
  defaultFieldNames,
  getSelectedOptionsByValue,
} from '../cascader/common'
import Popout from '../popout/popout.vue'
import { isNullish } from '../utils'
import { cascaderInputProps } from './common'

const props = defineProps(cascaderInputProps)

const emit = defineEmits(['update:visible', 'update:model-value', 'select'])

// main

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const popoutValue = ref(props.modelValue)

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onConfirm = () => {
  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)

  inputValue.value = getInputValue()
}

const onChange = (value: any) => {
  popoutValue.value = value

  if (!props.showConfirm && !isNullish(popoutValue.value)) {
    onConfirm()
    innerVisible.value = false
  }
}

// input
const inputValue = ref('')

const fieldkeys = computed(() => {
  return Object.assign(
    {},
    defaultFieldNames,
    props.fieldNames,
  ) as Required<CascaderFieldNames>
})

function getOutletText(
  options: CascaderOption[],
  value: string | number,
  fieldNames: Required<CascaderFieldNames>,
): string {
  const selectedOptions = getSelectedOptionsByValue(options, value, fieldNames)

  if (!selectedOptions) {
    return ''
  }

  const labels = selectedOptions.map((option) => option[fieldNames.label])

  return labels.join('/')
}

function getInputValue() {
  if (isNullish(innerValue.value) || !props.options) {
    return ''
  }
  return getOutletText(props.options, innerValue.value, fieldkeys.value)
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
