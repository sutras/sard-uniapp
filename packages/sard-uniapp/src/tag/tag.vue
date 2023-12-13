<template>
  <view :class="tagClass" :style="tagStyle" @click="$emit('click', $event)">
    <slot></slot>
    <view
      v-if="closable"
      :class="iconClass"
      :style="iconStyle"
      @click="$emit('close', $event)"
    >
      <Icon name="close" />
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
import { tagProps } from './common'

const props = defineProps(tagProps)

defineEmits(['click', 'close'])

const bem = createBem('tag')

// main

// others
const tagClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.theme),
    bem.m('plain', props.plain),
    bem.m(`${props.theme}-plain`, props.plain),
    bem.m(props.size),
    bem.m('round', props.round),
    bem.m('mark', props.mark),
    props.rootClass,
  )
})

const tagStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.plain ? props.color : props.textColor,
      borderColor: props.plain ? props.color : null,
      backgroundColor: !props.plain ? props.color : null,
    },
    props.rootStyle,
  )
})

const iconClass = computed(() => {
  return classNames(
    bem.e('close'),
    bem.em('close', props.theme),
    bem.em('close', `${props.theme}-plain`, props.plain),
  )
})

const iconStyle = computed(() => {
  return stringifyStyle({
    color: props.plain ? props.color : props.textColor,
  })
})
</script>

<style lang="scss">
@use './index.scss';
</style>
