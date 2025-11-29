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
    :arrow="arrow"
    :internal-arrow="$slots.arrow ? 1 : 0"
    :internal-prepend="$slots.prepend ? 1 : 0"
    :internal-append="$slots.append ? 1 : 0"
    :input-props="inputProps"
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
      :all-levels="allLevels"
      :multiple="multiple"
      :check-strictly="checkStrictly"
      :lazy="lazy"
      :load="load"
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
import { watch, computed, shallowRef, provide } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarCascaderPopout from '../cascader-popout/cascader-popout.vue'
import {
  type CascaderFieldKeys,
  type CascaderOption,
  cascaderOptionsContextSymbol,
  type CascaderValue,
  defaultFieldKeys,
  getSelectedOptionsByValue,
} from '../cascader/common'
import { isEmptyArray, isEmptyBinding, isNullish } from '../../utils'
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

const lazyOptions = shallowRef<CascaderOption[]>([])

provide(cascaderOptionsContextSymbol, {
  set(options) {
    lazyOptions.value = options
  },
})

const renderedOptions = computed(() => {
  return props.lazy && !!props.load ? lazyOptions.value : props.options
})

function getOutletText(
  options: CascaderOption[],
  value: CascaderValue,
  fieldKeys: Required<CascaderFieldKeys>,
): string | string[] {
  const selectedOptions = getSelectedOptionsByValue(
    options,
    value,
    fieldKeys,
    props.multiple,
  )

  if (!selectedOptions || selectedOptions.length === 0) {
    return getValueDisplay(value)
  }

  const labels = selectedOptions.map((option) => {
    return Array.isArray(option)
      ? option.map((item) => item[fieldKeys.label] as string)
      : (option[fieldKeys.label] as string)
  })

  return props.multiple
    ? labels.map((item) => (item as string[]).join('/'))
    : labels.join('/')
}

function getValueDisplay(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) =>
      Array.isArray(item) ? item.join('/') : item,
    ) as string[]
  }
  return isNullish(value) ? '' : String(value)
}

function getInputValue(options: CascaderOption[]) {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  if (!options || isEmptyArray(options)) {
    return getValueDisplay(innerValue.value)
  }
  return getOutletText(options, innerValue.value, fieldkeys.value)
}

function getMayMultilineText(value: string | string[]) {
  if (Array.isArray(value)) {
    const diff =
      value.length -
      (props.maxRows === -1 ? Number.MAX_SAFE_INTEGER : props.maxRows)

    const rows = value.slice(0, props.maxRows)

    if (diff > 0) {
      rows.push(`+${diff}`)
    }

    return rows.join('\n')
  }
  return value
}

watch(
  [innerValue, renderedOptions],
  () => {
    inputValue.value = getMayMultilineText(getInputValue(renderedOptions.value))
  },
  {
    immediate: true,
  },
)

const onConfirm = () => {
  emit('confirm')
}
</script>
