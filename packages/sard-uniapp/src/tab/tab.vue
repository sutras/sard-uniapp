<template>
  <view :class="tabClass" :style="tabStyle" :id="tabId" @click="onClick">
    <slot>
      {{ title }}
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
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  nextTick,
} from 'vue'
import { classNames, stringifyStyle, createBem, uniqid } from '../utils'
import { type TabContext, tabContextSymbol, tabProps } from '../tabs/common'
import { getBoundingClientRect } from '../utils'

const props = defineProps(tabProps)

const emit = defineEmits(['click'])

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
  return getBoundingClientRect(`#${tabId}`, instance)
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
  context.register(props.name, {
    getRect,
  })
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
const tabClass = computed(() => {
  return classNames(
    bem.e('tab'),
    bem.em('tab', 'current', isCurrent.value),
    bem.em('tab', 'disabled', props.disabled),
    props.rootClass,
  )
})

const tabStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
