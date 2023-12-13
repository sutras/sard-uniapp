<template>
  <view v-if="loading" :class="skeletonClass" :style="skeletonStyle">
    <SkeletonAvatar
      v-if="avatar"
      :animated="animated"
      :size="avatarSize"
      :round="avatarRound"
    />

    <view :class="bem.e('content')">
      <SkeletonTitle v-if="title" :animated="animated" :round="round" />
      <SkeletonParagraph :rows="rows" :animated="animated" :round="round" />
    </view>
  </view>
  <slot v-else></slot>
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
import SkeletonAvatar from '../skeleton-avatar/skeleton-avatar.vue'
import SkeletonTitle from '../skeleton-title/skeleton-title.vue'
import SkeletonParagraph from '../skeleton-paragraph/skeleton-paragraph.vue'
import { SkeletonProps } from './common'

const props = defineProps(SkeletonProps)

const bem = createBem('skeleton')

// main

// others
const skeletonClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const skeletonStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
