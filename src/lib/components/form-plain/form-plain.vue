<template>
  <view :class="rootClass" :style="rootStyle">
    <slot></slot>
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
const { expose } = useForm(props)

defineExpose<FormPlainExpose>(expose)
</script>
