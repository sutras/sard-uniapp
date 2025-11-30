<template>
  <!-- #ifdef WEB -->
  <teleport to="body">
    <!-- #endif -->
    <!-- #ifdef MP -->
    <root-portal>
      <!-- #endif -->
      <view
        v-show="pageVisible"
        class="sar-portal"
        :data-visible="visible ? 'show' : 'hide'"
        :data-lock="props.lockScroll ? 'lockable' : 'unlockable'"
      >
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
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type UseTransitionOptions,
  useLockScroll,
  useTransition,
  useZIndex,
} from '../../use'
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

// #ifdef WEB
onShow(() => {
  pageVisible.value = true
})

onHide(() => {
  pageVisible.value = false
})
// #endif

useLockScroll(() => props.visible, props.lockScroll)

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

<!--
用于APP端传送节点，以及自动阻止页面滚动
-->
<!-- #ifdef APP-PLUS || APP-HARMONY -->
<script module="render" lang="renderjs">
// @ts-expect-error ignore renderjs
export default {
  mounted() {
    // @ts-expect-error ignore renderjs
    const el = this.$ownerInstance.$el

    let hiddenCls = ''

    const lock = () => {
      document.body.classList.add(hiddenCls)
    }

    const unlock = () => {
      document.body.classList.remove(hiddenCls)
    }

    const toggleLock = (visible) => {
      if (visible === 'show') {
        lock()
      } else {
        unlock()
      }
    }

    let style = null

    const addStyle = () => {
      style = document.createElement('style')
      style.textContent = `.${hiddenCls}{overflow:hidden}`
      document.head.appendChild(style)
    }

    const removeStyle = () => {
      if (style) {
        style.remove()
      }
    }

    if (el) {
      document.body.appendChild(el)

      const lockable = el.getAttribute("data-lock") === 'lockable'

      if (lockable) {
        hiddenCls = 'sar-popup-hidden-' + (~~(Math.random() * 10e8)).toString(36)
        addStyle()
        toggleLock(el.getAttribute("data-visible"))

        const observer = new MutationObserver((mutationsList) => {
          for (let mutation of mutationsList) {
            if (mutation.type === "attributes" ) {
              if (mutation.attributeName === "data-visible") {
                toggleLock(el.getAttribute("data-visible"))
              }
            } else if (mutation.type === "childList") {
              if (!el.isConnected) {
                removeStyle()
                observer.disconnect()
              }
            }
          }
        })
        observer.observe(el, { attributes: true, childList: true, attributeFilter: ['data-visible']})
      }
    }
  },
}
</script>
<!-- #endif -->

<style lang="scss">
@import './index.scss';
</style>
