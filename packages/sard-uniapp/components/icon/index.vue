<template>
  <view :class="iconClass" :style="iconStyle">
    <image v-if="isImg" class="sar-icon-image" :src="name" />
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
  isFileUrl,
} from '../../utils'

export interface IconProps {
  styles?: StyleProp
  classes?: ClassProp
  name?: string
  prefix?: string
  size?: string
  color?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  prefix: '',
  name: '',
})

const isImg = computed(() => {
  return isFileUrl(props.name)
})

const iconClass = computed(() => {
  return classNames(
    'sar-icon',
    {
      [props.prefix]: props.prefix && !isImg.value,
      [props.prefix ? `${props.prefix}-${props.name}` : props.name]:
        !isImg.value,
    },
    props.classes,
  )
})

const iconStyle = computed(() => {
  return styleToString(
    {
      fontSize: props.size,
      color: props.color,
    },
    props.styles,
  )
})
</script>
