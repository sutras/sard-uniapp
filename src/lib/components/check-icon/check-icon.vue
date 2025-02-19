<template>
  <view :class="checkIconClass">
    <sar-icon v-if="iconName" :name="iconName" />
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { classNames, createBem } from '../../utils'
import { type CheckIconProps } from './common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CheckIconProps>(), {
  shape: 'square',
  type: 'check',
})

const bem = createBem('check-icon')

const iconName = computed(() => {
  return props.disabled && props.type === 'check'
    ? 'check'
    : props.disabled && props.type === 'dash'
    ? 'dash'
    : props.type === 'check'
    ? `check-${props.shape}-fill`
    : props.type === 'dash'
    ? `dash-${props.shape}-fill`
    : props.type === 'dot'
    ? `record-circle`
    : undefined
})

const checkIconClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.shape),
    bem.m(props.type),
    bem.m('disabled', props.disabled),
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
