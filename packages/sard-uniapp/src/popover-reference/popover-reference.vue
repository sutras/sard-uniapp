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
import {
  StyleValue,
  computed,
  inject,
  onMounted,
  getCurrentInstance,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  getBoundingClientRect,
  uniqid,
} from '../utils'
import { popoverContextSymbol, type PopoverContext } from '../popover/common'

export interface PopoverReferenceProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface PopoverReferenceEmits {
  (e: 'click', event: any): void
}

// interface PopoverReferenceSlots {
//   default(props: Record<string, never>): any
// }
// defineSlots<PopoverReferenceSlots>()

const props = withDefaults(defineProps<PopoverReferenceProps>(), {})

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
