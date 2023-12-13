<template>
  <Overlay
    v-if="overlay"
    :visible="visible"
    :z-index="zIndex"
    :background="background"
    :transparent="transparent"
    :root-style="overlayStyle"
    :root-class="overlayClass"
    @click="onOverlayClick"
  />
  <view
    v-show="realVisible"
    :class="popupClass"
    :style="popupStyle"
    @transitionend="onTransitionEnd"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import { useTransition, useZIndex } from '../use'
import Overlay from '../overlay/overlay.vue'
import { popupProps, usePopupVisibleHookProvide } from './common'

const props = defineProps(popupProps)

const emit = defineEmits([
  'overlay-click',
  'before-enter',
  'enter',
  'after-enter',
  'enter-cancelled',
  'before-leave',
  'leave',
  'after-leave',
  'leave-cancelled',
  'visible-hook',
])

const bem = createBem('popup')

// main
const [zIndex, increaseZIndex] = useZIndex()

const callVisibleHook = usePopupVisibleHookProvide()

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: toRef(props, 'visible'),
    duration: toRef(props, 'duration'),
    prefix: computed(() => bem.m(props.effect) + '-'),
    onVisibleHook(name) {
      callVisibleHook(name)
      emit('visible-hook', name)
      emit(name as any)

      if (name === 'before-enter') {
        increaseZIndex()
      }
    },
  }),
)

const onOverlayClick = (event: any) => {
  emit('overlay-click', event)
}

// others
const popupClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.effect),
    props.rootClass,
    transitionClass.value,
  )
})

const popupStyle = computed(() => {
  return stringifyStyle(
    {
      zIndex: zIndex.value,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
