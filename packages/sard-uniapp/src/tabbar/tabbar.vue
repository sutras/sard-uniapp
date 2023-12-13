<template>
  <view :class="tabbarClass" :style="tabbarStyle">
    <slot></slot>
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
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import { tabbarContextSymbol, type TabbarContext, tabbarProps } from './common'

const props = defineProps(tabbarProps)

const emit = defineEmits(['update:current'])

const bem = createBem('tabbar')

// main
const innerCurrent = ref(props.current)
watch(
  () => props.current,
  () => {
    if (props.current !== innerCurrent.value) {
      innerCurrent.value = props.current
    }
  },
)

const select: TabbarContext['select'] = (name) => {
  innerCurrent.value = name
  emit('update:current', name)
}

provide<TabbarContext>(
  tabbarContextSymbol,
  reactive({
    color: toRef(props, 'color'),
    activeColor: toRef(props, 'activeColor'),
    current: innerCurrent,
    select,
  }),
)

// others
const tabbarClass = computed(() => {
  return classNames(bem.b(), bem.m('bordered', props.bordered), props.rootClass)
})

const tabbarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
