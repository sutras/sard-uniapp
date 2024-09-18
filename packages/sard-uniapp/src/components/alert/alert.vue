<template>
  <view v-if="visible" :class="alertClass" :style="alertStyle">
    <view v-if="showIcon" :class="bem.e('icon')">
      <slot name="icon">
        <sar-icon :name="mapTypeIcon[type]" />
      </slot>
    </view>
    <view :class="bem.e('content')"><slot></slot></view>
    <view v-if="closable" :class="bem.e('close')" @click="onClose">
      <sar-icon name="close" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type AlertProps,
  type AlertSlots,
  type AlertEmits,
  defaultAlertProps,
  mapTypeIcon,
} from './common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<AlertProps>(), defaultAlertProps)

defineSlots<AlertSlots>()

const emit = defineEmits<AlertEmits>()

const bem = createBem('alert')

// main

const visible = ref(true)

const onClose = () => {
  visible.value = false
  emit('close')
}

// others
const alertClass = computed(() => {
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
})

const alertStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      background: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
