<template>
  <view :class="loadingClass">
    <view :class="iconClass" :style="iconStyle">
      <slot v-if="type === 'circular'" name="circular">
        <view :class="bem.e('spinner')"></view>
      </slot>
      <template v-else-if="type === 'clock'">
        <view
          v-for="i in 12"
          :key="i"
          :class="
            classNames(
              bem.e('scale'),
              bem.em('scale', i),
              !props.animated
                ? {
                    [bem.em('scale', 'hidden')]: i > scaleShowNum,
                  }
                : null,
            )
          "
        ></view>
      </template>
    </view>

    <view
      v-if="isRenderVisible($slots.default || text)"
      :class="bem.e('text')"
      :style="loadingTextStyle"
    >
      <slot>
        {{ text }}
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  classNames,
  stringifyStyle,
  isRenderVisible,
  createBem,
} from '../../utils'
import {
  type LoadingProps,
  type LoadingSlots,
  defaultLoadingProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<LoadingProps>(), defaultLoadingProps())

defineSlots<LoadingSlots>()

const bem = createBem('loading')

// main
const scaleShowNum = computed(() => {
  return Math.max(Math.floor(props.progress * 12), 1)
})

// others
const loadingClass = computed(() => {
  return classNames(bem.b(), bem.m('vertical', props.vertical))
})

const iconClass = computed(() => {
  return classNames(
    bem.e('icon'),
    bem.em('icon', props.type),
    bem.em('icon', 'animated', props.animated),
  )
})

const iconStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      fontSize: props.size,
    },
    props.type === 'circular' && !props.animated
      ? {
          transform: `rotate(${props.progress * 360}deg)`,
        }
      : null,
    props.rootClass,
  )
})

const loadingTextStyle = computed(() => {
  return stringifyStyle(
    { color: props.textColor, fontSize: props.textSize },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
