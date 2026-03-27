<template>
  <view :class="classNames(rootClass, anchorId)" :style="rootStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, getCurrentInstance } from 'vue'
import { classNames, getBoundingClientRect, uniqid } from '../../utils'
import { type ScrollSpyAnchorProps, type ScrollSpyAnchorSlots } from './common'
import {
  type ScrollSpyContext,
  scrollSpyContextSymbol,
} from '../scroll-spy/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ScrollSpyAnchorProps>(), {})

defineSlots<ScrollSpyAnchorSlots>()

// main
const context = inject<ScrollSpyContext>(
  scrollSpyContextSymbol,
) as ScrollSpyContext

if (!context) {
  throw new Error('ScrollSpyAnchor must be included in ScrollSpy.')
}

const anchorId = uniqid()
const instance = getCurrentInstance()

const getRect = () => {
  return getBoundingClientRect(`.${anchorId}`, instance)
}

onBeforeMount(() => {
  context.register(props.name, getRect)
})
</script>
