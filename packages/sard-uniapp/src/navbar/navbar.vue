<template>
  <view :class="navbarClass" :style="navbarStyle">
    <view v-if="$slots.left" :class="bem.e('left')">
      <slot name="left"></slot>
    </view>
    <view :class="bem.e('content')">
      <slot>
        <view :class="bem.e('title')">
          <slot name="title">
            {{ title }}
          </slot>
        </view>
      </slot>
    </view>
    <view v-if="$slots.right" :class="bem.e('right')">
      <slot name="right"></slot>
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
import { classNames, stringifyStyle, createBem } from '../utils'
import { navbarProps } from './common'

const props = defineProps(navbarProps)

const slots = useSlots()

const bem = createBem('navbar')

// main

// others
const navbarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('flow', props.flow),
    bem.m('custom', !!slots.default),
    props.rootClass,
  )
})

const navbarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
