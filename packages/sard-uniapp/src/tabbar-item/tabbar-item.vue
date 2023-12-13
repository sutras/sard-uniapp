<template>
  <view :class="tabbarItemClass" :style="tabbarItemStyle" @click="onClick">
    <slot>
      <view :class="bem.e('icon')">
        <slot name="icon">
          <Icon :name="icon" :family="iconFamily" :size="iconSize" />
        </slot>
        <Badge v-if="badge || dot" :value="badge" :dot="dot" fixed />
      </view>
      <view :class="bem.e('text')">
        {{ text }}
      </view>
    </slot>
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
import { computed, inject } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import {
  tabbarContextSymbol,
  type TabbarContext,
  tabbarItemProps,
} from '../tabbar/common'
import Icon from '../icon/icon.vue'
import Badge from '../badge/badge.vue'

const props = defineProps(tabbarItemProps)

const emit = defineEmits(['click'])

const bem = createBem('tabbar')

// main
const context = inject<TabbarContext>(tabbarContextSymbol) as TabbarContext

if (!context) {
  throw new Error('TabbarItem must be included in Tabbar.')
}

const isCurrent = computed(() => {
  return context.current === props.name
})

const onClick = (event: any) => {
  if (props.name !== undefined) {
    context.select(props.name)
  }
  emit('click', event)
}

// others
const tabbarItemClass = computed(() => {
  return classNames(
    bem.e('item'),
    bem.em('item', 'current', isCurrent.value),
    props.rootClass,
  )
})

const tabbarItemStyle = computed(() => {
  return stringifyStyle(
    {
      color: isCurrent.value ? context.activeColor : context.color,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
