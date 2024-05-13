<template>
  <view
    v-if="realVisible"
    :class="overlayClass"
    :style="overlayStyle"
    @click="onClick"
    @transitionend="onTransitionEnd"
    @touchmove.stop.prevent
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { useTransition } from '../../use'
import {
  type OverlayProps,
  type OverlaySlots,
  type OverlayEmits,
  overlayPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<OverlayProps>(), overlayPropsDefaults)

defineSlots<OverlaySlots>()

const emit = defineEmits<OverlayEmits>()

const bem = createBem('overlay')

// main
const onClick = (event: any) => {
  emit('click', event)
}

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: toRef(props, 'visible'),
    duration: toRef(props, 'duration'),
    prefix: bem.m(''),
  }),
)

// others
const overlayClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('transparent', props.transparent),
    transitionClass.value,
    props.rootClass,
  )
})

const overlayStyle = computed(() => {
  return stringifyStyle(
    {
      zIndex: props.zIndex,
      backgroundColor: props.background,
      transitionDuration: props.duration + 'ms',
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
