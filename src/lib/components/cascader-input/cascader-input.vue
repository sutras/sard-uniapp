<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    @clear="onClear"
    @click="onInputClick"
    :loading="loading"
  />

  <sar-popout
    :root-class="rootClass"
    :root-style="rootStyle"
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    :show-confirm="showConfirm"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <sar-cascader
        v-if="already"
        :model-value="popoutValue"
        @change="onChange"
        :options="options"
        :field-keys="fieldKeys"
        :placeholder="hintText"
        @select="(option, tabIndex) => $emit('select', option, tabIndex)"
      >
        <template #top="{ tabIndex }">
          <slot name="top" :tab-index="tabIndex"></slot>
        </template>
      </sar-cascader>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCascader from '../cascader/cascader.vue'
import {
  type CascaderFieldKeys,
  type CascaderOption,
  defaultFieldKeys,
  getSelectedOptionsByValue,
} from '../cascader/common'
import SarPopout from '../popout/popout.vue'
import { isNullish } from '../../utils'
import {
  type CascaderInputProps,
  type CascaderInputSlots,
  type CascaderInputEmits,
  defaultCascaderInputProps,
} from './common'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CascaderInputProps>(),
  defaultCascaderInputProps,
)

defineSlots<CascaderInputSlots>()

const emit = defineEmits<CascaderInputEmits>()

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

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: any) => {
  popoutValue.value = value

  if (!props.showConfirm && !isNullish(popoutValue.value)) {
    onConfirm()
    innerVisible.value = false
  }
}

const onConfirm = () => {
  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)
  emit('change', popoutValue.value)

  inputValue.value = getInputValue()
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
  innerValue,
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

watch(
  () => props.options,
  () => {
    inputValue.value = getInputValue()
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
