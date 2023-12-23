<template>
  <view
    :class="navbarClass"
    :style="navbarStyle"
    @click="$emit('click', $event)"
  >
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
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { navbarItemProps } from '../navbar/common'

const props = defineProps(navbarItemProps)

defineEmits(['click'])

const bem = createBem('navbar')

// main

// others
const navbarClass = computed(() => {
  return classNames(bem.e('item'), props.rootClass)
})

const navbarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
