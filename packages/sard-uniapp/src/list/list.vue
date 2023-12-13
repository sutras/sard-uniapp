<template>
  <view :class="listClass" :style="stringifyStyle(rootStyle)">
    <view v-if="isRenderVisible($slots.title || title)" :class="bem.e('title')">
      <slot name="title">{{ title }}</slot>
    </view>
    <view :class="bem.e('content')">
      <slot></slot>
    </view>
    <view
      v-if="isRenderVisible($slots.description || description)"
      :class="bem.e('description')"
    >
      <slot name="description">{{ description }}</slot>
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
import { computed } from 'vue'
import {
  classNames,
  stringifyStyle,
  isRenderVisible,
  createBem,
} from '../utils'
import { listProps } from './common'

const props = defineProps(listProps)

const bem = createBem('list')

// main

// others
const listClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('card', props.card),
    bem.m('inlaid', props.inlaid),
    props.rootClass,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
