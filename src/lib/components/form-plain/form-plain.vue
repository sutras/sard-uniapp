<template>
  <view :class="rootClass" :style="rootStyle">
    <!-- 默认插槽，并将 context 传出去 -->
    <slot :context="formContext"></slot>
  </view>
</template>

<script setup lang="ts">
import {
  type FormPlainProps,
  type FormPlainSlots,
  type FormPlainExpose,
} from './common'
import { useForm } from '../form/useForm'
import { defaultFormProps } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FormPlainProps>(), defaultFormProps)

defineSlots<FormPlainSlots>()

// main
const { expose, formContext } = useForm(props)

defineExpose<FormPlainExpose>(expose)
</script>
