<template>
  <view :class="formItemClass" :style="formItemStyle">
    <view
      v-if="$slots.label || !isNullish(label)"
      :class="bem.e('label')"
      :style="labelStyle"
    >
      <view v-if="shouldShowStar" :class="bem.e('star')">*</view>
      <slot name="label">{{ label }}</slot>
    </view>
    <view :class="bem.e('content')">
      <slot></slot>
      <slot name="validate" :state="validateState"></slot>
      <slot
        name="error"
        :message="validateMessage"
        :show-error="shouldShowError"
      >
        <view v-if="shouldShowError" :class="bem.e('error')">
          {{ validateMessage }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import {
  type FormItemProps,
  type FormItemSlots,
  type FormItemExpose,
  defaultFormItemProps,
} from '../form/common'
import { useFormItem } from './useFormItem'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FormItemProps>(), defaultFormItemProps())

defineSlots<FormItemSlots>()

const bem = createBem('form-item')

const {
  expose,
  fieldId,
  validateState,
  shouldShowStar,
  validateMessage,
  shouldShowError,
  direction,
  labelAlign,
  labelValign,
  starPosition,
  labelWidth,
} = useFormItem(props)

defineExpose<FormItemExpose>(expose)

// others

const formItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(direction.value),
    bem.m('inlaid', props.inlaid),
    bem.m(`align-${labelAlign.value}`),
    bem.m(`valign-${labelValign.value}`),
    bem.m(`star-${starPosition.value}`),
    props.rootClass,
    fieldId,
  )
})

const formItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const labelStyle = computed(() => {
  return stringifyStyle({
    width: direction.value === 'horizontal' && labelWidth.value,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
