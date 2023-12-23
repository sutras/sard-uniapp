<template>
  <view :class="cardClass" :style="cardStyle">
    <view v-if="!headless" :class="bem.e('header')">
      <view :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
      </view>
      <view :class="bem.e('extra')">
        <slot name="extra">{{ extra }}</slot>
      </view>
    </view>
    <view :class="bem.e('body')">
      <slot></slot>
    </view>
    <view v-if="!footless" :class="bem.e('footer')">
      <slot name="footer">{{ footer }}</slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isVisibleEmpty,
} from '../../utils'
import { cardProps } from './common'

const props = defineProps(cardProps)

defineEmits(['click'])

const slots = useSlots()

const bem = createBem('card')

// main
const headless = computed(() => {
  return (
    isVisibleEmpty(props.title) &&
    !slots.title &&
    isVisibleEmpty(props.extra) &&
    !slots.extra
  )
})

const footless = computed(() => {
  return isVisibleEmpty(props.footer) && !slots.footer
})

// others
const cardClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('headless', headless.value),
    bem.m('footless', footless.value),
    props.rootClass,
  )
})

const cardStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
