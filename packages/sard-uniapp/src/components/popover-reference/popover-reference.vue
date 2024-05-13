<template>
  <view :class="refClass" :style="refStyle" :id="referenceId" @click="onClick">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, getCurrentInstance } from 'vue'
import {
  classNames,
  stringifyStyle,
  getBoundingClientRect,
  uniqid,
} from '../../utils'
import {
  type PopoverReferenceProps,
  type PopoverReferenceSlots,
  type PopoverReferenceEmits,
  type PopoverContext,
  popoverContextSymbol,
} from '../popover/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PopoverReferenceProps>(), {})

defineSlots<PopoverReferenceSlots>()

const emit = defineEmits<PopoverReferenceEmits>()

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
