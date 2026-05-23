<template>
  <view :class="shareSheetRowClass" :style="shareSheetRowStyle">
    <scroll-view scroll-x>
      <view :class="bem.e('content')">
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type ShareSheetRowProps,
  type ShareSheetRowSlots,
  type ShareSheetRowEmits,
  type ShareSheetRowExpose,
  defaultShareSheetRowProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ShareSheetRowProps>(),
  defaultShareSheetRowProps(),
)

defineSlots<ShareSheetRowSlots>()

defineEmits<ShareSheetRowEmits>()

const bem = createBem('share-sheet-row')

// main

// others
defineExpose<ShareSheetRowExpose>({})

const shareSheetRowClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const shareSheetRowStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
