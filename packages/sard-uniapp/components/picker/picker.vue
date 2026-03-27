<template>
  <view :class="pickerClass" :style="pickerStyle">
    <slot
      v-if="isNumber(internalCustom) ? internalCustom : $slots.custom"
      name="custom"
      :columns="renderedColumns"
      :picker-view-class="pickerViewClass"
      :mask-class="maskClass"
      :indicator-class="indicatorClass"
      :value="columnIndexes"
      :on-change="onChange"
    ></slot>
    <picker-view
      v-else
      :class="pickerViewClass"
      :immediate-change="immediateChange"
      :indicator-class="indicatorClass"
      :mask-class="maskClass"
      :value="columnIndexes"
      @change="onChange"
    >
      <picker-view-column v-for="(column, i) in renderedColumns" :key="i">
        <sar-picker-item v-for="(option, j) in column" :key="j">
          {{ getLabel(option) }}
        </sar-picker-item>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  nestedToMulti,
  toArray,
  arrayEqual,
  isNumber,
  isEmptyBinding,
  isEmptyArray,
} from '../../utils'
import {
  type PickerProps,
  type PickerSlots,
  type PickerEmits,
  getColumnsType,
  getIndexesByValue,
  getCascaderValidIndexes,
  getOptionsByIndexes,
  getMaySingleValueByOptions,
  defaultPickerProps,
} from './common'
import SarPickerItem from '../picker-item/picker-item.vue'
import { useOptionKeys } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PickerProps>(), defaultPickerProps())

defineSlots<PickerSlots>()

const emit = defineEmits<PickerEmits>()

const bem = createBem('picker')

// main
const useOptionKeysReturn = useOptionKeys(props)

const { aliasProps, getLabel } = useOptionKeysReturn

const columnsType = computed(() => {
  return getColumnsType(props.columns, useOptionKeysReturn)
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

// columnIndexes
const columnIndexes = ref<number[]>([])

const updateColumnIndexes = () => {
  const indexes = getIndexesByValue(
    toArray(innerValue.value),
    props.columns,
    useOptionKeysReturn,
  )
  if (!arrayEqual(indexes, columnIndexes.value)) {
    columnIndexes.value = indexes
  }
}

updateColumnIndexes()

watch([innerValue, () => props.columns, aliasProps], () => {
  if (!isEmptyBinding(innerValue.value) && !isEmptyArray(innerValue.value)) {
    updateColumnIndexes()
  }
})

const onChange = (event: any) => {
  if (!props.columns || props.columns.length === 0) {
    return
  }

  let indexes = event.detail.value as number[]

  // 在H5弹出框中使用时，在初始化会触发change，值中会携带Infinity的下标。
  if (indexes.some((index) => index === Infinity)) {
    nextTick(() => {
      columnIndexes.value =
        isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)
          ? columnIndexes.value.map(() => 0)
          : [...columnIndexes.value]
    })
    return
  }

  indexes = renderedColumns.value.map((_, index) => indexes[index] || 0)

  if (columnsType.value === 'cascader') {
    let startIndex = -1
    const nextIndexes: number[] = []
    for (let i = 0; i < columnIndexes.value.length; i++) {
      if (startIndex < 0 && columnIndexes.value[i] !== indexes[i]) {
        startIndex = i
      }
      nextIndexes.push(startIndex > -1 && i > startIndex ? 0 : indexes[i])
    }
    indexes = nextIndexes

    // 多列同时滚动时下标可能会超过当前列的长度，这里要做一个限制
    {
      const validIndexes = getCascaderValidIndexes(
        indexes,
        props.columns,
        useOptionKeysReturn,
      )
      if (!arrayEqual(indexes, validIndexes)) {
        indexes = validIndexes
      }
    }
  }

  const selectedOptions = getOptionsByIndexes(
    indexes,
    props.columns,
    useOptionKeysReturn,
  )

  if (!arrayEqual(indexes, columnIndexes.value)) {
    columnIndexes.value = indexes
  }

  const nextValue = getMaySingleValueByOptions(
    selectedOptions,
    useOptionKeysReturn,
    props.columns,
  )

  innerValue.value = nextValue
  emit('update:model-value', nextValue, selectedOptions, indexes)
  emit('change', nextValue, selectedOptions, indexes)
}

// renderedColumns
const getRenderedColumns = () => {
  switch (columnsType.value) {
    case 'single':
      return [props.columns]
    case 'multi':
      return props.columns
    case 'cascader':
      return nestedToMulti(
        props.columns,
        toArray(innerValue.value),
        useOptionKeysReturn,
      )
    default:
      return []
  }
}

const renderedColumns = ref(getRenderedColumns())

const updateRenderedColumns = () => {
  renderedColumns.value = getRenderedColumns()
}

watch(
  [() => props.columns, innerValue],
  ([newColumns, newValue], [oldColumns, oldValue]) => {
    if (
      newColumns !== oldColumns ||
      (newValue !== oldValue &&
        columnsType.value === 'cascader' &&
        !isEmptyBinding(newValue) &&
        !isEmptyArray(newValue))
    ) {
      updateRenderedColumns()
    }
  },
)

watch(
  () => props.modelValue,
  () => {
    if (isEmptyBinding(props.modelValue) || isEmptyArray(props.modelValue)) {
      updateColumnIndexes()
      updateRenderedColumns()
    }
  },
)

// others
const pickerClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const pickerStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const pickerViewClass = bem.e('picker-view')
const indicatorClass = bem.e('indicator')
const maskClass = bem.e('mask')
</script>

<style lang="scss">
@import './index.scss';
</style>
