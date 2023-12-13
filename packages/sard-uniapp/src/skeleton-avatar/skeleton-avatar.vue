<template>
  <SkeletonBlock
    :root-class="skeletonAvatarClass"
    :root-style="skeletonAvatarStyle"
    :animated="animated"
    :round="round"
    :width="width"
    :height="height"
  />
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
import SkeletonBlock from '../skeleton-block/skeleton-block.vue'
import { SkeletonAvatarProps } from '../skeleton/common'

const props = defineProps(SkeletonAvatarProps)

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
@use './index.scss';
</style>
