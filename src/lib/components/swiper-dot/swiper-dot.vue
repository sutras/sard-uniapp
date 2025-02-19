<template>
  <view :class="swiperDotClass" :style="swiperDotStyle">
    <template v-if="type === 'fraction'">
      {{ current + 1 }}/{{ innerList.length }}
    </template>
    <template v-else-if="type === 'title'">
      <view :class="bem.e('item')">
        {{ current + 1 }}/{{ innerList.length }}
        {{ innerList[current]?.[field] }}
      </view>
    </template>
    <template v-else>
      <view
        v-for="(n, i) in innerList.length"
        :key="i"
        :class="
          classNames(bem.e('item'), bem.em('item', 'active', i === current))
        "
      >
        {{ type === 'index' ? n : '' }}
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type SwiperDotProps, defaultSwiperDotProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SwiperDotProps>(), defaultSwiperDotProps)

const bem = createBem('swiper-dot')

// main
const innerList = computed(() => {
  return props.list ?? Array(props.total).fill('')
})

// others
const swiperDotClass = computed(() => {
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
})

const swiperDotStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
