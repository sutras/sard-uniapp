<template>
  <view :class="skeletonParagraphClass" :style="skeletonParagraphStyle">
    <SkeletonBlock
      v-for="i in rows"
      :key="i"
      :animated="animated"
      :round="round"
      :width="width"
      :height="height"
      :root-class="bem.e('row')"
    />
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
import SkeletonBlock from '../skeleton-block/skeleton-block.vue'
import { skeletonParagraphProps } from '../skeleton/common'

const props = defineProps(skeletonParagraphProps)

const bem = createBem('skeleton')

// main

// others
const skeletonParagraphClass = computed(() => {
  return classNames(bem.e('paragraph'), props.rootClass)
})

const skeletonParagraphStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
