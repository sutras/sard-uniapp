<template>
  <view :class="coolIconClass" :style="coolIconStyle" @click="onClick">
    <view :class="bgClass" :style="bgStyle">
      <view :class="bem.e('adorns')">
        <view v-for="i in 6" :key="i" :class="bem.e('adorn')"></view>
      </view>
    </view>
    <view :class="bem.e('icon')">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type CoolIconProps,
  type CoolIconSlots,
  type CoolIconEmits,
  type CoolIconExpose,
  defaultCoolIconProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CoolIconProps>(), defaultCoolIconProps)

defineSlots<CoolIconSlots>()

const emit = defineEmits<CoolIconEmits>()

const bem = createBem('cool-icon')

// main

const onClick = (event: any) => {
  emit('click', event)
}

// others
defineExpose<CoolIconExpose>({})

const coolIconClass = computed(() => {
  return classNames(bem.b(), bem.m(props.shape), props.rootClass)
})

const coolIconStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.size,
      height: props.size,
      fontSize: props.iconSize,
      color: props.color,
    },
    props.rootStyle,
  )
})

const bgClass = computed(() => {
  return classNames(bem.e('bg'))
})

const bgStyle = computed(() => {
  return stringifyStyle({
    background: props.background,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
