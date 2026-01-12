<template>
  <view
    :class="collapseClass"
    :style="collapseStyle"
    @transitionend="onTransitionEnd"
  >
    <view
      v-if="rendered"
      :class="classNames(bem.e('content'), contentClass)"
      :style="stringifyStyle(contentStyle)"
      :id="contentId"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, watch, computed, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import { type CollapseProps, type CollapseSlots } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CollapseProps>(), {})

defineSlots<CollapseSlots>()

const bem = createBem('collapse')

// main
const instance = getCurrentInstance()
const contentId = uniqid()

const getHeight = async () => {
  return (await getBoundingClientRect(`#${contentId}`, instance)).height
}

const collapseHeight = ref<string>(props.visible ? 'auto' : '0px')

const rendered = ref(!props.lazy || props.visible)

const open = () => {
  collapseHeight.value = '0px'
  rendered.value = true

  setTimeout(async () => {
    const height = await getHeight()
    collapseHeight.value = height + 'px'
  }, 30)
}

const close = async () => {
  const height = await getHeight()
  collapseHeight.value = height + 'px'

  setTimeout(async () => {
    collapseHeight.value = '0px'
  }, 30)
}

const onTransitionEnd = () => {
  if (collapseHeight.value !== '0px') {
    collapseHeight.value = 'auto'
  }
  if (!props.visible && props.destroyOnClose) {
    rendered.value = false
  }
}

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      open()
    } else {
      close()
    }
  },
)

// others
const collapseClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const collapseStyle = computed(() => {
  return stringifyStyle(
    {
      height: collapseHeight.value,
      overflow: collapseHeight.value === 'auto' ? 'visible' : 'hidden',
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
