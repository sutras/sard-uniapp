<template>
  <view :class="cellClass" :style="cellStyle" @click="onClick">
    <view v-if="$slots.icon" class="sar-cell-header">
      <view class="sar-cell-icon">
        <slot name="icon"></slot>
      </view>
    </view>

    <view class="sar-cell-content">
      <slot>
        <view class="sar-cell-body">
          <view v-if="$slots.title || title" class="sar-cell-title">
            <slot name="title">
              {{ title }}
            </slot>
          </view>

          <view v-if="$slots.label || label" class="sar-cell-label">
            <slot name="label">
              {{ label }}
            </slot>
          </view>
        </view>

        <view class="sar-cell-footer">
          <view v-if="$slots.value || value" class="sar-cell-value">
            <slot name="value">
              {{ value }}
            </slot>
          </view>

          <view v-if="isLink" class="sar-cell-arrow">
            <slot name="arrow">
              <Icon prefix="sari" :name="arrowDirection"></Icon>
            </slot>
          </view>
        </view>
      </slot>
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
import Icon from '../icon/index.vue'
import {
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface CellProps {
  styles?: StyleProp
  classes?: ClassProp
  title?: string | number
  label?: string | number
  value?: string | number
  inlaid?: boolean
  isLink?: boolean
  inset?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
}

const props = withDefaults(defineProps<CellProps>(), {
  arrowDirection: 'right',
})

export interface CellEmits {
  (e: 'click', event: MouseEvent): void
}
const emit = defineEmits<CellEmits>()

// export interface CellSlots {
//   default(props: Record<string, never>): any
//   icon(props: Record<string, never>): any
//   title(props: Record<string, never>): any
//   label(props: Record<string, never>): any
//   value(props: Record<string, never>): any
//   arrow(props: Record<string, never>): any
// }
// defineSlots<CellSlots>()

const cellClass = computed(() => {
  return classNames(
    'sar-cell',
    {
      'sar-cell-is-link': props.isLink,
      'sar-cell-inset': props.inset,
    },
    props.classes,
  )
})

const cellStyle = computed(() => {
  return styleToString(props.styles)
})

const onClick = (event: any) => {
  emit('click', event)
}
</script>
