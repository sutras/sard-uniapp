<template>
  <view :class="rowClass" :style="rowStyle">
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
import { computed, provide, ComputedRef } from 'vue'
import {
  splitUnit,
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface RowProps {
  styles?: StyleProp
  classes?: ClassProp
  gutter?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export type RowContext = ComputedRef<{
  gutter: number | string
  gap: readonly [number, string]
}>

// export interface RowSlots {
//   default(props: Record<string, never>): any
// }
// defineSlots<RowSlots>()

const props = withDefaults(defineProps<RowProps>(), {})

const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}
const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

const gap = computed(() => {
  if (props.gutter) {
    const result = splitUnit(props.gutter)
    return [result[0] / 2, result[1] || 'px'] as const
  }
  return [0, 'px'] as const
})

const rowStyle = computed(() => {
  return styleToString(
    {
      justifyContent: props.justify && mapJustify[props.justify],
      alignItems: props.align && mapAlign[props.align],
    },
    props.gutter
      ? {
          marginLeft: -gap.value[0] + gap.value[1],
          marginRight: -gap.value[0] + gap.value[1],
        }
      : null,
    props.styles,
  )
})

const rowClass = computed(() => {
  return classNames('sar-row', props.classes)
})

const rowContext: RowContext = computed(() => {
  return {
    gutter: props.gutter,
    gap: gap.value,
  }
})

provide<RowContext>('sar-row', rowContext)
</script>
