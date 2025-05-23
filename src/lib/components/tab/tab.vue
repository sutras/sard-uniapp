<template>
  <view :class="tabClass" :style="tabStyle" @click="onClick">
    <slot>
      {{ title }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  nextTick,
} from 'vue'
import { classNames, stringifyStyle, createBem, uniqid } from '../../utils'
import {
  type TabProps,
  type TabSlots,
  type TabEmits,
  type TabContext,
  tabContextSymbol,
} from '../tabs/common'
import { getBoundingClientRect } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TabProps>(), {})

defineSlots<TabSlots>()

const emit = defineEmits<TabEmits>()

const bem = createBem('tabs')

// main
const context = inject<TabContext>(tabContextSymbol) as TabContext

if (!context) {
  throw new Error('Tab must be included in Tabs.')
}

const instance = getCurrentInstance()

const isCurrent = computed(() => {
  return context.current === props.name
})

const tabId = uniqid()

const getRect = () => {
  return getBoundingClientRect(`.${tabId}`, instance)
}

const select = (initial?: boolean) => {
  context.select(props.name, initial)
}

const onClick = (event: any) => {
  emit('click', event)

  if (!props.disabled) {
    select()
  }
}

onMounted(() => {
  context.register(props.name, {
    getRect,
  })
  if (isCurrent.value) {
    nextTick(() => {
      select(true)
    })
  }
})

onUnmounted(() => {
  context.unregister(props.name)
})

// others
const tabClass = computed(() => {
  return classNames(
    bem.e('tab'),
    bem.em('tab', 'current', isCurrent.value),
    bem.em('tab', 'disabled', props.disabled),
    props.rootClass,
    tabId,
  )
})

const tabStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
