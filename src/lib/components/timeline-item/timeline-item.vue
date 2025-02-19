<template>
  <view :class="itemClass" :style="itemStyle">
    <view :class="bem.e('header')">
      <view :class="classNames(bem.e('line'), bem.em('line', 'before'))"></view>
      <view :class="bem.e('icon-wrapper')">
        <view v-if="icon || $slots.icon" :class="bem.e('icon')">
          <slot name="icon">
            <sar-icon :name="icon" :family="iconFamily" :color="iconColor" />
          </slot>
        </view>
        <view v-else :class="bem.e('dot')"></view>
      </view>
      <view :class="classNames(bem.e('line'), bem.em('line', 'after'))"></view>
    </view>
    <view :class="bem.e('body')">
      <view v-if="title || $slots.title" :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="$slots.default" :class="bem.e('description')">
        <slot></slot>
      </view>
      <view :class="bem.e('time')">
        <slot name="time">{{ time }}</slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type TimelineItemProps,
  type TimelineItemSlots,
} from '../timeline/common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TimelineItemProps>(), {})

defineSlots<TimelineItemSlots>()

const bem = createBem('timeline-item')

// main

// others
const itemClass = computed(() => {
  return classNames(bem.b(), bem.m('dotted', !props.icon), props.rootClass)
})

const itemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
