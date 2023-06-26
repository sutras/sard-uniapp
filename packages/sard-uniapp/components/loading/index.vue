<template>
  <view :class="loadingClass" :style="loadingStyle">
    <view :class="iconClass" :style="iconStyle">
      <template v-if="type === 'clock'">
        <view v-for="i in 12" :key="i" class="sar-loading-scale"></view>
      </template>
    </view>

    <view
      v-if="$slots.default || text"
      class="sar-loading-text"
      :style="loadingTextStyle"
    >
      <slot>
        {{ text }}
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
import {
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface LoadingProps {
  styles?: StyleProp
  classes?: ClassProp
  type?: 'clock' | 'circular'
  color?: string
  size?: string
  text?: string
  textColor?: string
  textSize?: string
  vertical?: boolean
}

const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circular',
})

//  interface LoadingSlots {
//   default(props: Record<string, never>): any
// }
// defineSlots<LoadingSlots>()

const loadingClass = computed(() => {
  return classNames(
    'sar-loading',
    {
      'sar-loading-vertical': props.vertical,
    },
    props.classes,
  )
})

const loadingStyle = computed(() => {
  return styleToString(props.styles)
})

const iconClass = computed(() => {
  return classNames('sar-loading-icon', 'sar-loading-' + props.type)
})

const iconStyle = computed(() => {
  return styleToString({
    color: props.color,
    fontSize: props.size,
  })
})

const loadingTextStyle = computed(() => {
  return styleToString({ color: props.textColor, fontSize: props.textSize })
})
</script>
