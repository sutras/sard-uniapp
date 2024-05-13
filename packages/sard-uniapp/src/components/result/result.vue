<template>
  <view :class="resultClass" :style="resultStyle">
    <slot name="icon">
      <view :class="iconClass">
        <sar-icon
          :name="mapStatusIcon[status]"
          :family="iconFamily"
          :color="iconColor"
        />
      </view>
    </slot>

    <view v-if="title" :class="bem.e('title')">
      <slot name="title">{{ title }}</slot>
    </view>

    <view v-if="title" :class="bem.e('description')">
      <slot name="description">{{ description }}</slot>
    </view>

    <view v-if="$slots.default" :class="bem.e('extra')"><slot></slot></view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type ResultProps,
  type ResultSlots,
  mapStatusIcon,
  resultPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ResultProps>(), resultPropsDefaults)

defineSlots<ResultSlots>()

const bem = createBem('result')

// main

// others
const resultClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const resultStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const iconClass = computed(() => {
  return classNames(bem.e('icon'), bem.em('icon', props.status))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
