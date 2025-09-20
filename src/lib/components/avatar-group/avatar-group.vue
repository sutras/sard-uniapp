<template>
  <view :class="avatarGroupClass" :style="avatarGroupStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type AvatarGroupProps,
  type AvatarGroupSlots,
  type AvatarGroupEmits,
  type AvatarGroupExpose,
  defaultAvatarGroupProps,
  avatarGroupContextSymbol,
  AvatarGroupContext,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<AvatarGroupProps>(),
  defaultAvatarGroupProps,
)

defineSlots<AvatarGroupSlots>()

const emit = defineEmits<AvatarGroupEmits>()

const bem = createBem('avatar-group')

// main

provide<AvatarGroupContext>(
  avatarGroupContextSymbol,
  reactive({
    total: toRef(() => props.total),
    max: toRef(() => props.max),
    showRemain: toRef(() => props.showRemain),
    coverage: toRef(() => props.coverage),
    remainText: toRef(() => props.remainText ?? `+${props.total - props.max}`),
    onRemainClick: (event: any) => {
      emit('remain-click', event)
    },
  }),
)

// others
defineExpose<AvatarGroupExpose>({})

const avatarGroupClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const avatarGroupStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
