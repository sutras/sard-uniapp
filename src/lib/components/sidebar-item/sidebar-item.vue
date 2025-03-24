<template>
  <view :class="sidebarItemClass" :style="sidebarItemStyle" @click="onClick">
    <view v-if="isCurrent && context.round" :class="bem.e('round-top')"></view>
    <view v-if="isCurrent && context.line" :class="bem.e('line')"></view>
    <slot>
      <view :class="bem.e('title')">
        {{ title }}
      </view>
    </slot>
    <view
      v-if="isCurrent && context.round"
      :class="bem.e('round-bottom')"
    ></view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type SidebarItemProps,
  type SidebarItemSlots,
  type SidebarItemEmits,
  type SidebarItemExpose,
} from './common'
import { SidebarContext, sidebarContextSymbol } from '../sidebar/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SidebarItemProps>(), {})

defineSlots<SidebarItemSlots>()

const emit = defineEmits<SidebarItemEmits>()

const bem = createBem('sidebar-item')

// main
const context = inject<SidebarContext>(sidebarContextSymbol) as SidebarContext

if (!context) {
  throw new Error('SidebarItem must be included in Sidebar.')
}

const instance = getCurrentInstance()

const isCurrent = computed(() => {
  return context.current === props.name
})

const itemId = uniqid()

const getRect = () => {
  return getBoundingClientRect(`.${itemId}`, instance)
}

const select = () => {
  context.select(props.name)
}

const onClick = (event: any) => {
  emit('click', event)

  if (!props.disabled) {
    select()
  }
}

onMounted(() => {
  context.register(props.name, getRect)
  if (isCurrent.value) {
    nextTick(() => {
      select()
    })
  }
})

onUnmounted(() => {
  context.unregister(props.name)
})

// others
const sidebarItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('current', isCurrent.value),
    bem.m('disabled', props.disabled),
    props.rootClass,
    itemId,
  )
})

const sidebarItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

defineExpose<SidebarItemExpose>({
  reset: () => {
    void 0
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
