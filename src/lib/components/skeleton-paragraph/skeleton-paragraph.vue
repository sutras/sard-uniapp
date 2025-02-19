<template>
  <view :class="skeletonParagraphClass" :style="skeletonParagraphStyle">
    <sar-skeleton-block
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

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarSkeletonBlock from '../skeleton-block/skeleton-block.vue'
import { type SkeletonParagraphProps } from '../skeleton/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SkeletonParagraphProps>(), {})

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
@import './index.scss';
</style>
