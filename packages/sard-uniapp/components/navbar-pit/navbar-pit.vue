<template>
  <view :class="navbarPitClass" :style="navbarPitStyle">
    <sar-status-bar v-if="statusBar" />
    <view :class="bem.e('content')"></view>
  </view>
</template>

<script lang="ts" setup>
import SarStatusBar from '../status-bar/status-bar.vue'
import { type NavbarPitProps } from './common'
import { classNames, createBem, stringifyStyle } from '../../utils'
import { computed } from 'vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NavbarPitProps>(), {})

const bem = createBem('navbar-pit')

// others
const navbarPitClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const navbarPitStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
