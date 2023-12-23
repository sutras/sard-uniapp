<template>
  <sar-popup
    :visible="visible"
    :overlay="overlay"
    :duration="duration"
    :transparent="transparent"
    :root-style="popupStyle"
    effect="fade"
  >
    <view :class="toastClass" :style="toastStyle">
      <view v-if="type !== 'text'" :class="iconClass">
        <sar-loading v-if="type === 'loading'" />
        <sar-icon v-else :name="type" />
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
import { useSetTimeout } from '../../use'
import { ToastExpose, toastProps } from './common'

const props = defineProps(toastProps)

const emit = defineEmits(['update:visible'])

const bem = createBem('toast')

// main
const innerVisible = ref(props.visible)

const [hideLater, cancelHide] = useSetTimeout(() => {
  innerVisible.value = false
  emit('update:visible', false)
})

const reHideLater = () => {
  cancelHide()

  nextTick(() => {
    if (props.type !== 'loading' && props.timeout > 0) {
      hideLater(props.timeout)
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.type !== 'loading' && props.timeout > 0) {
        hideLater(props.timeout)
      }
    }
  },
)

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
