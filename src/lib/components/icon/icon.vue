<template>
  <view :class="iconClass" :style="iconStyle" @click="onClick">
    <image v-if="isImg" :class="bem.e('image')" :src="name" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, isFileUrl, createBem } from '../../utils'
import { type IconProps, type IconEmits, defaultIconProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<IconProps>(), defaultIconProps)

const emit = defineEmits<IconEmits>()

const bem = createBem('icon')

// main
const isImg = computed(() => {
  return isFileUrl(props.name)
})

const onClick = (event: any) => {
  emit('click', event)
}

// others
const iconClass = computed(() => {
  if (isImg.value) {
    return classNames(bem.b(), props.rootClass)
  }
  if (props.name.includes(':')) {
    const [family, name] = props.name.split(':')
    return classNames(
      bem.b(),
      family,
      props.separate && family !== 'sari' ? name : `${family}-${name}`,
      props.rootClass,
    )
  }

  return classNames(
    bem.b(),
    props.family,
    props.separate && props.family !== 'sari'
      ? props.name
      : `${props.family}-${props.name}`,
    props.rootClass,
  )
})

const iconStyle = computed(() => {
  return stringifyStyle(
    {
      fontSize: props.size,
      color: props.color,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
