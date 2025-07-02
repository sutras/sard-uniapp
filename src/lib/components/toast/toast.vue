<template>
  <sar-popup
    :visible="visible"
    :overlay="overlay"
    :duration="duration"
    :transparent="transparent"
    :root-style="popupStyle"
    effect="fade"
    @visible-hook="onVisibleHook"
  >
    <view :class="toastClass" :style="toastStyle">
      <view v-if="type !== 'text'" :class="iconClass">
        <sar-loading v-if="type === 'loading'" />
        <sar-icon v-else family="sari" :name="type" />
      </view>
      <view :class="bem.e('title')">{{ title }}</view>
    </view>
  </sar-popup>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}

export const mapIdToast: Record<
  string,
  {
    show(props: Record<string, any>): void
    hide(): void
  }
> = {}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarLoading from '../loading/loading.vue'
import SarIcon from '../icon/icon.vue'
import { type TransitionHookName, useTimeout } from '../../use'
import {
  type ToastProps,
  type ToastEmits,
  type ToastExpose,
  defaultToastProps,
} from './common'

const props = withDefaults(defineProps<ToastProps>(), defaultToastProps)

const emit = defineEmits<ToastEmits>()

const bem = createBem('toast')

// main
const innerVisible = ref(props.visible)

const { start: hideLater, stop: cancelHide } = useTimeout(
  () => {
    innerVisible.value = false
    emit('update:visible', false)
  },
  () => props.timeout,
)

const reHideLater = () => {
  cancelHide()

  nextTick(() => {
    if (props.type !== 'loading' && props.timeout > 0) {
      hideLater()
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.type !== 'loading' && props.timeout > 0) {
        hideLater()
      }
    }
  },
)

const onVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  emit(name as any)
}

defineExpose<ToastExpose>({
  reHideLater,
  cancelHide,
})

// others
const toastClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('is-text', props.type === 'text'),
    bem.m('not-text', props.type !== 'text'),

    props.rootClass,
  )
})
const toastStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const popupStyle = computed(() => {
  const style = {
    top: {
      top: 'var(--sar-toast-top)',
      transform: 'translate(-50%, 0)',
    },
    bottom: {
      top: 'auto',
      bottom: 'var(--sar-toast-bottom)',
      transform: 'translate(-50%, 0)',
    },
    center: null,
  }[props.position]

  return stringifyStyle({
    width: 'max-content',
    maxWidth: 'var(--sar-toast-text-max-width)',
    ...style,
  })
})

const iconClass = computed(() => {
  return classNames(
    bem.e('icon'),
    bem.em('icon', 'loading', props.type === 'loading'),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
