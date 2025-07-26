<template>
  <view :class="rootClass" :style="rootStyle">
    <slot></slot>
    <slot
      name="custom"
      :field-id="fieldId"
      :validate-state="validateState"
      :should-show-star="shouldShowStar"
      :validate-message="validateMessage"
      :should-show-error="shouldShowError"
      :direction="direction"
      :label-align="labelAlign"
      :label-valign="labelValign"
      :star-position="starPosition"
      :label-width="labelWidth"
    ></slot>
  </view>
</template>

<script setup lang="ts">
import { useFormItem } from '../form-item/useFormItem'
import {
  type FormItemPlainProps,
  type FormItemPlainSlots,
  type FormItemPlainExpose,
} from '../form-plain/common'
import { defaultFormItemProps } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<FormItemPlainProps>(),
  defaultFormItemProps(),
)

defineSlots<FormItemPlainSlots>()
// main

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

// others
defineExpose<FormItemPlainExpose>(expose)
</script>
