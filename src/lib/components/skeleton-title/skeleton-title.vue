<template>
  <sar-skeleton-block
    :root-class="skeletonTitleClass"
    :root-style="skeletonTitleStyle"
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
import { type SkeletonTitleProps } from '../skeleton/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SkeletonTitleProps>(), {})

const bem = createBem('skeleton')

// main

// others
const skeletonTitleClass = computed(() => {
  return classNames(bem.e('title'), props.rootClass)
})

const skeletonTitleStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
