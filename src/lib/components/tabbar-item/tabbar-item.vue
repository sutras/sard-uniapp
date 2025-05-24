<template>
  <view :class="tabbarItemClass" :style="tabbarItemStyle" @click="onClick">
    <slot>
      <view :class="bem.e('icon')">
        <slot name="icon" :active="isCurrent">
          <sar-icon
            :name="icon"
            :family="iconFamily || 'sari'"
            :size="iconSize"
          />
        </slot>
        <sar-badge v-if="badge || dot" :value="badge" :dot="dot" fixed />
      </view>
      <view :class="bem.e('text')">
        {{ text }}
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type TabbarItemProps,
  type TabbarItemSlots,
  type TabbarItemEmits,
  type TabbarContext,
  tabbarContextSymbol,
} from '../tabbar/common'
import SarIcon from '../icon/icon.vue'
import SarBadge from '../badge/badge.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TabbarItemProps>(), {})

defineSlots<TabbarItemSlots>()

const emit = defineEmits<TabbarItemEmits>()

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
@import './index.scss';
</style>
