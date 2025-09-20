<template>
  <view :class="avatarClass" :style="avatarStyle" @click="onClick">
    <slot>
      <image
        v-if="src"
        :src="src"
        mode="aspectFill"
        :class="classNames(bem.e('image'), bem.m(shape))"
      />

      <sar-icon
        v-else
        family="sari"
        name="person"
        :root-class="bem.e('icon')"
      />
    </slot>
    <slot name="extra"></slot>

    <view
      v-if="
        context && context.showRemain && context.total > context.max && isLast
      "
      :class="remainClass"
      @click="context.onRemainClick"
    >
      {{ context.remainText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  AvatarEmits,
  type AvatarProps,
  type AvatarSlots,
  defaultAvatarProps,
} from './common'
import {
  AvatarGroupContext,
  avatarGroupContextSymbol,
} from '../avatar-group/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<AvatarProps>(), defaultAvatarProps)

defineSlots<AvatarSlots>()

const emit = defineEmits<AvatarEmits>()

const bem = createBem('avatar')

// main
const context = inject<AvatarGroupContext | null>(
  avatarGroupContextSymbol,
  null,
)

const isLast = computed(() => context && context.max - 1 === props.index)

const onClick = (event: any) => {
  emit('click', event)
}

// others
const avatarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.shape),
    bem.m('in-group', !!context),
    props.rootClass,
  )
})

const avatarStyle = computed(() => {
  return stringifyStyle(
    {
      width: props.size,
      height: props.size,
      color: props.color,
      fontSize: props.iconSize,
      background: props.background,
      marginLeft:
        context && props.index !== 0
          ? `calc(${props.size ? props.size : `var(--sar-avatar-width)`} * ${-context.coverage})`
          : undefined,
    },
    props.rootStyle,
  )
})

const remainClass = computed(() => {
  return classNames(bem.e('remain'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
