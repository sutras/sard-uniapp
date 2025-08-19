<template>
  <view :class="segmentedClass" :style="segmentedStyle">
    <view :class="groupClass">
      <view :class="pointerClass" :style="pointerStyle"></view>
      <slot>
        <sar-segmented-item
          v-for="(option, i) in convertedOptions"
          :key="i"
          :value="option.value"
          :label="option.label"
          :disabled="option.disabled"
          :icon="option.icon"
          :icon-family="option.iconFamily"
          :icon-size="option.iconSize"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRef, watch } from 'vue'
import { classNames, stringifyStyle, createBem, isPrimitive } from '../../utils'
import {
  type SegmentedProps,
  type SegmentedSlots,
  type SegmentedEmits,
  type SegmentedExpose,
  type SegmentedContext,
  defaultSegmentedProps,
  defaultOptionKeys,
  segmentedContextSymbol,
} from './common'
import SarSegmentedItem from '../segmented-item/segmented-item.vue'
import { useFormItemContext } from '../form'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SegmentedProps>(), defaultSegmentedProps)

defineSlots<SegmentedSlots>()

const emit = defineEmits<SegmentedEmits>()

const bem = createBem('segmented')

// main
const formItemContext = useFormItemContext()

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

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

const convertedOptions = computed(() => {
  return (props.options || []).map((option) => {
    return isPrimitive(option)
      ? {
          label: option,
          value: option,
        }
      : {
          label: option[fieldKeys.value.label],
          value: option[fieldKeys.value.value],
          disabled: option[fieldKeys.value.disabled],
          icon: option.icon,
          iconFamily: option.iconFamily,
          iconSize: option.iconSize,
        }
  })
})

const currentIndex = computed(() => {
  return convertedOptions.value.findIndex(
    (option) => option.value === innerValue.value,
  )
})

const optionsCount = computed(() => convertedOptions.value.length)

const toggle: SegmentedContext['toggle'] = (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value
    emit('update:model-value', value)
    emit('change', value)
  }
}

provide<SegmentedContext>(
  segmentedContextSymbol,
  reactive({
    disabled: toRef(() => props.disabled),
    readonly: toRef(() => props.readonly),
    size: toRef(() => props.size),
    shape: toRef(() => props.shape),
    value: innerValue,
    toggle,
  }),
)

// others
defineExpose<SegmentedExpose>({})

const segmentedClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.size),
    bem.m(props.direction),
    bem.m(props.shape),
    props.rootClass,
  )
})

const segmentedStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const groupClass = computed(() => {
  return classNames(bem.e('group'))
})

const pointerClass = computed(() => {
  return classNames(bem.e('pointer'))
})

const pointerStyle = computed(() => {
  const isHorizontal = props.direction === 'horizontal'
  return {
    [isHorizontal ? 'width' : 'height']: (1 / optionsCount.value) * 100 + '%',
    transform: `translate${isHorizontal ? 'X' : 'Y'}(${currentIndex.value * 100}%)`,
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
