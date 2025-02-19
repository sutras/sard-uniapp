<template>
  <sar-skeleton-block
    :root-class="skeletonAvatarClass"
    :root-style="skeletonAvatarStyle"
    :animated="animated"
    :round="round"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarSkeletonBlock from '../skeleton-block/skeleton-block.vue'
import { type SkeletonAvatarProps } from '../skeleton/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SkeletonAvatarProps>(), {})

const bem = createBem('skeleton')

// main

// others
const skeletonAvatarClass = computed(() => {
  return classNames(bem.e('avatar'), props.rootClass)
})

const skeletonAvatarStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.size,
      height: props.size,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
