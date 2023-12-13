<template>
  <view :class="progressBarClass" :style="progressBarStyle">
    <view :class="bem.e('track')" :style="trackStyle">
      <view :class="bem.e('piece')" :style="pieceStyle">
        <view v-if="showText && inside" :class="bem.e('text')">
          <slot>{{ percent }}%</slot>
        </view>
      </view>
    </view>
    <view v-if="showText && !inside && !status" :class="bem.e('text')">
      <slot>{{ percent }}%</slot>
    </view>
    <view v-if="status" :class="bem.e('status')">
      <Icon :name="iconName" />
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
import { classNames, stringifyStyle, createBem } from '../utils'
import Icon from '../icon/icon.vue'
import { progressBarProps } from './common'

const props = defineProps(progressBarProps)

const bem = createBem('progress-bar')

// main
const iconName = computed(() => {
  if (!props.status) {
    return ''
  }
  return {
    success: 'check-circle-fill',
    warning: 'warning-fill',
    error: 'x-circle-fill',
  }[props.status]
})

// others
const progressBarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('inside', props.inside),
    bem.m('striped', props.striped),
    bem.m('animated', props.animated),
    bem.m(props.status),
    props.rootClass,
  )
})

const progressBarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const trackStyle = computed(() => {
  return stringifyStyle({
    height: props.thickness,
    backgroundColor: props.trackColor,
  })
})

const pieceStyle = computed(() => {
  return stringifyStyle({
    width: `${props.percent}%`,
    backgroundColor: props.color,
  })
})
</script>

<style lang="scss">
@use './index.scss';
</style>
