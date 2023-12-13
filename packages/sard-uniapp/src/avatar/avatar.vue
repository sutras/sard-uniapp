<template>
  <view :class="avatarClass" :style="avatarStyle">
    <slot>
      <image
        v-if="src"
        :src="src"
        mode="aspectFill"
        :class="classNames(bem.e('image'), bem.m(shape))"
      />

      <Icon v-else name="person" :root-class="bem.e('icon')" />
    </slot>
    <slot name="extra"></slot>
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
import { avatarProps } from './common'

const props = defineProps(avatarProps)

const bem = createBem('avatar')

// main

// others
const avatarClass = computed(() => {
  return classNames(bem.b(), bem.m(props.shape), props.rootClass)
})

const avatarStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.size,
      height: props.size,
      color: props.color,
      fontSize: props.iconSize,
      backgroundColor: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
