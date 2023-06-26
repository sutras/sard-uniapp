<template>
  <view :class="colClass" :style="colStyle">
    <slot></slot>
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
import { computed, inject } from 'vue'
import { type RowContext } from '../row/index.vue'
import {
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface ColProps {
  styles?: StyleProp
  classes?: ClassProp
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

// export interface ColSlots {
//   default(props: Record<string, never>): any
// }
// defineSlots<ColSlots>()

const props = withDefaults(defineProps<ColProps>(), {})

const colClass = computed(() => {
  return classNames(
    'sar-col',
    {
      ['sar-col-' + props.span]: props.span,
      ['sar-col-offset-' + props.offset]: props.offset,
    },
    props.classes,
  )
})

const context = inject<RowContext>('sar-row')

const colStyle = computed(() => {
  const { gutter, gap } = context.value

  return styleToString(
    props.order !== undefined
      ? {
          order: props.order,
        }
      : null,
    gutter
      ? {
          paddingLeft: gap[0] + gap[1],
          paddingRight: gap[0] + gap[1],
        }
      : null,
    props.styles,
  )
})
</script>
