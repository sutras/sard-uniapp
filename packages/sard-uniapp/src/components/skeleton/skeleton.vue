<template>
  <view v-if="loading" :class="skeletonClass" :style="skeletonStyle">
    <sar-skeleton-avatar
      v-if="avatar"
      :animated="animated"
      :size="avatarSize"
      :round="avatarRound"
    />

    <view :class="bem.e('content')">
      <sar-skeleton-title v-if="title" :animated="animated" :round="round" />
      <sar-skeleton-paragraph
        :rows="rows"
        :animated="animated"
        :round="round"
      />
    </view>
  </view>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarSkeletonAvatar from '../skeleton-avatar/skeleton-avatar.vue'
import SarSkeletonTitle from '../skeleton-title/skeleton-title.vue'
import SarSkeletonParagraph from '../skeleton-paragraph/skeleton-paragraph.vue'
import {
  type SkeletonProps,
  type SkeletonSlots,
  defaultSkeletonProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SkeletonProps>(), defaultSkeletonProps)

defineSlots<SkeletonSlots>()

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
@import './index.scss';
</style>
