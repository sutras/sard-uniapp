<template>
  <view :class="avatarClass" :style="avatarStyle">
    <slot>
      <image
        v-if="src"
        :src="src"
        mode="aspectFill"
        :class="classNames(bem.e('image'), bem.m(shape))"
      />

      <sar-icon
        v-else
        family="sari"
        name="person"
        :root-class="bem.e('icon')"
      />
    </slot>
    <slot name="extra"></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type AvatarProps,
  type AvatarSlots,
  defaultAvatarProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<AvatarProps>(), defaultAvatarProps)

defineSlots<AvatarSlots>()

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
      background: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
