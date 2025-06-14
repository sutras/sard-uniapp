<template>
  <view :class="tagClass" :style="tagStyle" @click="$emit('click', $event)">
    <slot></slot>
    <view v-if="closable" :class="iconClass" @click="$emit('close', $event)">
      <sar-icon family="sari" name="close" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type TagProps,
  type TagSlots,
  type TagEmits,
  defaultTagProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TagProps>(), defaultTagProps)

defineSlots<TagSlots>()

defineEmits<TagEmits>()

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
    bem.m(props.mark === true ? 'mark' : `mark-${props.mark}`, !!props.mark),
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
  return classNames(bem.e('close'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
