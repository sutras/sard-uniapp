<template>
  <view :class="indexesAnchorClass" :style="indexesAnchorStyle">
    <slot>
      {{ name }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount, getCurrentInstance } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
  isNullish,
} from '../../utils'
import {
  type IndexesAnchorProps,
  type IndexesAnchorSlots,
  type IndexesContext,
  indexesContextSymbol,
} from '../indexes/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<IndexesAnchorProps>(), {})

defineSlots<IndexesAnchorSlots>()

const bem = createBem('indexes')

// main
const context = inject<IndexesContext>(indexesContextSymbol) as IndexesContext

if (!context) {
  throw new Error('IndexesAnchor must be included in Indexes.')
}

const anchorId = uniqid()
const instance = getCurrentInstance()

const getRect = () => {
  return getBoundingClientRect(`.${anchorId}`, instance)
}

onBeforeMount(() => {
  if (!isNullish(props.name)) {
    context.register(props.name, getRect)
  }
})

// others
const indexesAnchorClass = computed(() => {
  return classNames(bem.e('anchor'), props.rootClass, anchorId)
})

const indexesAnchorStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
