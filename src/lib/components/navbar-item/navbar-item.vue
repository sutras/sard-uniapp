<template>
  <view
    :class="navbarClass"
    :style="navbarStyle"
    @click="$emit('click', $event)"
  >
    <slot>
      <sar-icon
        v-if="icon"
        :class="bem.e('item-icon')"
        :name="icon"
        :family="iconFamily"
        :size="iconSize"
      />

      <text v-if="text" :class="bem.e('item-text')">{{ text }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type NavbarItemProps,
  type NavbarItemSlots,
  type NavbarItemEmits,
} from '../navbar/common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NavbarItemProps>(), {})

defineSlots<NavbarItemSlots>()

defineEmits<NavbarItemEmits>()

const bem = createBem('navbar')

// main

// others
const navbarClass = computed(() => {
  return classNames(
    bem.e('item'),
    bem.m('reverse', props.reverse),
    props.rootClass,
  )
})

const navbarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
