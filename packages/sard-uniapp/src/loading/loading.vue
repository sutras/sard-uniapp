<template>
  <view :class="loadingClass">
    <view :class="iconClass" :style="iconStyle">
      <template v-if="type === 'clock'">
        <view v-for="i in 12" :key="i" :class="bem.e('scale')"></view>
      </template>
    </view>

    <view
      v-if="isRenderVisible($slots.default || text)"
      :class="bem.e('text')"
      :style="loadingTextStyle"
    >
      <slot>
        {{ text }}
      </slot>
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
import { loadingProps } from './common'

const props = defineProps(loadingProps)

const bem = createBem('loading')

// main

// others
const loadingClass = computed(() => {
  return classNames(bem.b(), bem.m('vertical', props.vertical))
})

const iconClass = computed(() => {
  return classNames(bem.e('icon'), bem.em('icon', props.type))
})

const iconStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      fontSize: props.size,
    },
    props.rootClass,
  )
})

const loadingTextStyle = computed(() => {
  return stringifyStyle(
    { color: props.textColor, fontSize: props.textSize },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
