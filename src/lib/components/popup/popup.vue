<template>
  <!-- #ifdef WEB -->
  <teleport to="body">
    <!-- #endif -->
    <!-- #ifdef MP -->
    <root-portal>
      <!-- #endif -->
      <view class="sar-portal">
        <sar-overlay
          v-if="overlay"
          :visible="visible"
          :duration="duration"
          :z-index="zIndex"
          :background="background"
          :transparent="transparent"
          :root-style="overlayStyle"
          :root-class="overlayClass"
          @click="onOverlayClick"
        />
        <view
          :class="popupClass"
          :style="popupStyle"
          @transitionend="onTransitionEnd"
        >
          <slot></slot>
        </view>
      </view>
      <!-- #ifdef MP -->
    </root-portal>
    <!-- #endif -->
    <!-- #ifdef WEB -->
  </teleport>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type UseTransitionOptions, useTransition, useZIndex } from '../../use'
import SarOverlay from '../overlay/overlay.vue'
import {
  type PopupProps,
  type PopupSlots,
  type PopupEmits,
  defaultPopupProps,
  usePopupVisibleHookProvide,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PopupProps>(), defaultPopupProps)

defineSlots<PopupSlots>()

const emit = defineEmits<PopupEmits>()

const bem = createBem('popup')

// main
const [zIndex, increaseZIndex] = useZIndex()

const callVisibleHook = usePopupVisibleHookProvide()

const keepRenderClass = ref(
  props.keepRender ? bem.m(props.effect) + '-keep' : '',
)

const onVisibleHook: UseTransitionOptions['onVisibleHook'] = (name) => {
  callVisibleHook(name)
  emit('visible-hook', name)
  emit(name as any)

  if (name === 'before-enter') {
    increaseZIndex()
  }

  if (props.keepRender) {
    keepRenderClass.value =
      name === 'after-leave' ? bem.m(props.effect) + '-' + name + '-keep' : ''
  }
}

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: toRef(() => props.visible),
    duration: toRef(() => props.duration),
    prefix: computed(() => bem.m(props.effect) + '-'),
    onVisibleHook,
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
    keepRenderClass.value,
  )
})

const popupStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    zIndex: zIndex.value,
    display: props.keepRender || realVisible.value ? 'flex' : 'none',
    transitionDuration: props.duration + 'ms',
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
