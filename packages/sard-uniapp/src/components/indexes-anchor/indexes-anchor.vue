<template>
  <view :class="indexesAnchorClass" :style="indexesAnchorStyle" :id="anchorId">
    <slot>
      {{ name }}
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
import { computed, inject, onBeforeMount, getCurrentInstance } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
} from '../../utils'
import {
  type IndexesContext,
  indexesContextSymbol,
  indexesAnchorProps,
} from '../indexes/common'

const props = defineProps(indexesAnchorProps)

const bem = createBem('indexes')

// main
const context = inject<IndexesContext>(indexesContextSymbol) as IndexesContext

if (!context) {
  throw new Error('IndexesAnchor must be included in Indexes.')
}

const anchorId = uniqid()
const instance = getCurrentInstance()

const getRect = () => {
  return getBoundingClientRect(`#${anchorId}`, instance)
}

onBeforeMount(() => {
  context.register(props.name, {
    getRect,
    id: anchorId,
  })
})

// others
const indexesAnchorClass = computed(() => {
  return classNames(bem.e('anchor'), props.rootClass)
})

const indexesAnchorStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
