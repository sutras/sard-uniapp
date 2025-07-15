<template>
  <!-- #ifdef WEB -->
  <teleport to="body">
    <!-- #endif -->
    <!-- #ifdef MP -->
    <root-portal>
      <!-- #endif -->
      <view v-show="pageVisible" class="sar-portal">
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
        <!-- #ifndef MP -->
        <view
          v-bind="$attrs"
          :class="popupClass"
          :style="popupStyle"
          @transitionend="onTransitionEnd"
        >
          <slot></slot>
        </view>
        <!-- #endif -->
        <!-- #ifdef MP -->
        <view
          :class="popupClass"
          :style="popupStyle"
          @transitionend="onTransitionEnd"
        >
          <slot></slot>
        </view>
        <!-- #endif -->
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
import { onHide, onShow } from '@dcloudio/uni-app'
import { classNames, stringifyStyle, createBem, isWeb } from '../../utils'
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
  inheritAttrs: false,
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

  if (props.overlayClosable) {
    emit('update:visible', false)
  }
}

const pageVisible = ref(true)

onShow(() => {
  if (isWeb) {
    pageVisible.value = true
  }
})

onHide(() => {
  if (isWeb) {
    pageVisible.value = false
  }
})

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

<!-- #ifdef APP-PLUS -->
<script module="render" lang="renderjs">
// @ts-expect-error ignore renderjs
export default {
  mounted() {
    const root = document.querySelector('uni-app') || document.body
    // @ts-expect-error ignore renderjs
    if (this.$ownerInstance.$el) {
      // @ts-expect-error ignore renderjs
      root.appendChild(this.$ownerInstance.$el)
    }
  }
}
</script>
<!-- #endif -->

<style lang="scss">
@import './index.scss';
</style>
