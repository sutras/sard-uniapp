<template>
  <view :class="backTopClass" :style="backTopStyle" @click="onClick">
    <slot>
      <sar-icon name="backtop" />
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type BackTopProps,
  type BackTopSlots,
  type BackTopEmits,
  defaultBackTopProps,
} from './common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<BackTopProps>(), defaultBackTopProps)

defineSlots<BackTopSlots>()

const emit = defineEmits<BackTopEmits>()

const bem = createBem('back-top')

// main
const visible = computed(() => {
  return props.scrollTop >= props.visibleHeight
})

const onClick = (event: any) => {
  emit('click', event)
}

// others
const backTopClass = computed(() => {
  return classNames(bem.b(), bem.m('visible', visible.value), props.rootClass)
})

const backTopStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    right: props.right,
    bottom: props.bottom,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
