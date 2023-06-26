<template>
  <view :class="cellGroupClass" :style="cellGroupStyle">
    <view v-if="$slots.title || title" class="sar-cell-group-header">
      <view class="sar-cell-group-title">
        <slot name="title">
          {{ title }}
        </slot>
      </view>
    </view>

    <view class="sar-cell-group-body">
      <slot></slot>
    </view>

    <view v-if="$slots.label || label" class="sar-cell-group-footer">
      <view class="sar-cell-group-label">
        <slot name="label">
          {{ label }}
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface CellGroupProps {
  styles?: StyleProp
  classes?: ClassProp
  title?: string | number
  label?: string | number
  inlaid?: boolean
}

// export interface CellGroupSlots {
//   default(props: Record<string, never>): any
//   title(props: Record<string, never>): any
//   label(props: Record<string, never>): any
// }
// defineSlots<CellGroupSlots>()

const props = withDefaults(defineProps<CellGroupProps>(), {})

const cellGroupClass = computed(() => {
  return classNames(
    'sar-cell-group',
    {
      'sar-cell-group-inlaid': props.inlaid,
    },
    props.classes,
  )
})

const cellGroupStyle = computed(() => {
  return styleToString(props.styles)
})
</script>
