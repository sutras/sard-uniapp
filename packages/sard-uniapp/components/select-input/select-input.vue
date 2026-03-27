<template>
  <sar-popout-input
    v-bind="popoutInputProps"
    v-model="inputValue"
    :multiline="multiple"
    @clear="onClear"
    @click="show"
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

    <sar-select-popout
      v-bind="omittedProps"
      v-model:visible="innerVisible"
      v-model="innerValue"
      :internal-default="$slots.default ? 1 : 0"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <slot></slot>
    </sar-select-popout>
  </sar-popout-input>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarSelectPopout from '../select-popout/select-popout.vue'
import {
  type SelectInputProps,
  type SelectInputSlots,
  type SelectInputEmits,
  type SelectInputExpose,
  defaultSelectInputProps,
} from './common'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  useOptionKeys,
  usePopoutInput,
} from '../../use'
import { isEmptyArray, isEmptyBinding } from '../../utils'
import { useSelect } from '../select/useSelect'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SelectInputProps>(),
  defaultSelectInputProps(),
)

const slots = defineSlots<SelectInputSlots>()

const emit = defineEmits<SelectInputEmits>()

// main
const { getLabel, getValue, getChildren } = useOptionKeys(props)

const popoutInputProps = pickPopoutInputProps(props, slots)

const omittedProps = omitPopoutInputProps(props, ['internalDefault'])

const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

const isGroupable = computed(() => {
  const first = props.options[0]
  return first && Array.isArray(getChildren(first))
})

const labelCache: Record<any, any> = {}

const getCacheLabel = (option: any, value: any) => {
  if (option) {
    return (labelCache[value] = getLabel(option))
  } else {
    return labelCache[value] ?? value
  }
}

function getOutletText(options: any[], value: any) {
  if (isGroupable.value) {
    options = options.map((option) => getChildren(option)).flat(1)
  }

  if (props.multiple) {
    if (!Array.isArray(value)) return ''

    let labels = value.map((val) => {
      const option = options.find((option) => getValue(option) === val)
      return getCacheLabel(option, val)
    })

    const maxLabels =
      props.maxLabels === -1 ? Number.MAX_SAFE_INTEGER : props.maxLabels
    const diff = labels.length - maxLabels

    labels = labels.slice(0, maxLabels)

    if (diff > 0) {
      labels.push(`+${diff}`)
    }

    return labels.join(', ')
  } else {
    const option = options.find((option) => getValue(option) === value)
    return getCacheLabel(option, value)
  }
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.options, innerValue.value)
}

watch(
  [innerValue, () => props.options, () => props.maxLabels],
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

// provide
if (slots.default) {
  useSelect(props)
}

// others
defineExpose<SelectInputExpose>({})
</script>
