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
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarSkeletonBlock from '../skeleton-block/skeleton-block.vue'
import { skeletonTitleProps } from '../skeleton/common'

const props = defineProps(skeletonTitleProps)

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
