<template>
  <view :class="refClass" :style="refStyle" :id="referenceId" @click="onClick">
    <slot></slot>
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
import { computed, inject, onMounted, getCurrentInstance } from 'vue'
import {
  classNames,
  stringifyStyle,
  getBoundingClientRect,
  uniqid,
} from '../../utils'
import {
  type PopoverContext,
  popoverContextSymbol,
  popoverReferenceProps,
} from '../popover/common'

const props = defineProps(popoverReferenceProps)

const emit = defineEmits(['click'])

// main
const referenceId = uniqid()
const instance = getCurrentInstance()
const context = inject<PopoverContext>(popoverContextSymbol)

const getRect = () => {
  return getBoundingClientRect(`#${referenceId}`, instance)
}

onMounted(() => {
  context?.register({
    getRect,
  })
})

const onClick = (event: any) => {
  context?.show()
  emit('click', event)
}

// others
const refClass = computed(() => {
  return classNames(props.rootClass)
})

const refStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>
