<template>
  <view :class="swipeActionGroupClass" :style="swipeActionGroupStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type SwipeActionGroupProps,
  type SwipeActionGroupSlots,
  type SwipeActionGroupExpose,
  type SwipeActionGroupContext,
  swipeActionGroupContextSymbol,
  defaultSwipeActionGroupProps,
} from './common'
import { type SwipeActionExpose } from '../swipe-action'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SwipeActionGroupProps>(),
  defaultSwipeActionGroupProps(),
)

defineSlots<SwipeActionGroupSlots>()

const bem = createBem('swipe-action-group')

const itemMap = new Map<string, SwipeActionExpose>()

const closeAll: SwipeActionGroupContext['closeAll'] = (exceptId) => {
  itemMap.forEach((item, id) => {
    if (id !== exceptId) {
      item.hide()
    }
  })
}

const register = (id: string, expose: SwipeActionExpose) => {
  itemMap.set(id, expose)
}

const unregister = (id: string) => {
  itemMap.delete(id)
}

provide<SwipeActionGroupContext>(
  swipeActionGroupContextSymbol,
  reactive({
    multiple: toRef(() => props.multiple),
    register,
    unregister,
    closeAll,
  }),
)

defineExpose<SwipeActionGroupExpose>({
  closeAll: () => closeAll(),
})

const swipeActionGroupClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const swipeActionGroupStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
