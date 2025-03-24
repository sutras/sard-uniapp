<template>
  <view v-if="$slots.default" :class="bem.e('wrapper')">
    <slot></slot>
    <view :class="badgeClass" :style="badgeStyle">
      <slot name="value">
        {{ innerValue }}
      </slot>
    </view>
  </view>
  <view v-else :class="badgeClass" :style="badgeStyle">
    <slot name="value">
      {{ innerValue }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type BadgeProps, type BadgeSlots, defaultBadgeProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<BadgeProps>(), defaultBadgeProps)

const slots = defineSlots<BadgeSlots>()

const bem = createBem('badge')

// main
const zeroHide = computed(() => {
  return !props.dot && props.value === 0 && !props.showZero && !slots.value
})

const innerValue = computed(() => {
  return props.dot
    ? ''
    : typeof props.value === 'number' && props.value > props.max
    ? `${props.max}+`
    : props.value === 0 && !props.showZero
    ? ''
    : props.value
})

// others
const badgeClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('fixed', props.fixed || !!slots.default),
    bem.m('zero-hide', zeroHide.value),
    bem.m('dot', props.dot),
    props.rootClass,
  )
})

const badgeStyle = computed(() => {
  return stringifyStyle(
    {
      background: props.color,
      color: props.textColor,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
