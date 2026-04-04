<template>
  <sar-popout-input
    v-bind="popoutInputProps"
    v-model="inputValue"
    :internal-prepend="1"
    :class="bem.b()"
    @clear="onClear"
    @click="show"
  >
    <template #prepend>
      <view :class="bem.e('preview')">
        <view :class="bem.e('preview-fill')" :style="previewStyle"></view>
      </view>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <template #arrow>
      <slot name="arrow"></slot>
    </template>

    <sar-color-picker-popout
      v-bind="omittedProps"
      v-model:visible="innerVisible"
      v-model="innerValue"
      keep-render
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    />
  </sar-popout-input>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import SarColorPickerPopout from '../color-picker-popout/color-picker-popout.vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import {
  omitPopoutInputProps,
  pickPopoutInputProps,
  usePopoutInput,
} from '../../use'
import {
  type ColorPickerInputProps,
  type ColorPickerInputSlots,
  type ColorPickerInputEmits,
  type ColorPickerInputExpose,
  defaultColorPickerInputProps,
} from './common'
import { isEmptyBinding, stringifyStyle, createBem } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ColorPickerInputProps>(),
  defaultColorPickerInputProps(),
)

const slots = defineSlots<ColorPickerInputSlots>()

const emit = defineEmits<ColorPickerInputEmits>()

const bem = createBem('color-picker-input')

// main

const popoutInputProps = pickPopoutInputProps(props, slots)

const omittedProps = omitPopoutInputProps(props)

const {
  innerVisible,
  innerValue,
  inputValue,
  show,
  onChange,
  onClear,
  onVisibleHook,
} = usePopoutInput(props, emit)

const getInputValue = () => {
  if (isEmptyBinding(innerValue.value)) {
    return ''
  }
  return String(innerValue.value)
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

const previewStyle = computed(() => {
  return stringifyStyle({
    background: innerValue.value,
  })
})

const onConfirm = () => {
  emit('confirm')
}

defineExpose<ColorPickerInputExpose>({})
</script>

<style lang="scss">
@import './index.scss';
</style>
