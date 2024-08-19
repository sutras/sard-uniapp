<template>
  <view :class="tabbarClass" :style="tabbarStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type TabbarProps,
  type TabbarSlots,
  type TabbarEmits,
  type TabbarContext,
  tabbarContextSymbol,
  tabbarPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TabbarProps>(), tabbarPropsDefaults)

defineSlots<TabbarSlots>()

const emit = defineEmits<TabbarEmits>()

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
    color: toRef(() => props.color),
    activeColor: toRef(() => props.activeColor),
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
@import './index.scss';
</style>
