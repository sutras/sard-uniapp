<template>
  <sar-popup
    :visible="innerVisible"
    :overlay="false"
    :effect="effect"
    :duration="duration"
    @visible-hook="onVisibleHook"
  >
    <view :class="notifyClass" :style="notifyStyle" @click="onClick">
      <sar-status-bar v-if="position === 'top' && statusBar" />
      <view :class="bem.e('content')">
        <slot>{{ message }}</slot>
      </view>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type TransitionHookName, useTimeout } from '../../use'
import {
  type NotifyExpose,
  type NotifyProps,
  type NotifyEmits,
  type NotifySlots,
  defaultNotifyProps,
} from './common'
import SarPopup from '../popup/popup.vue'
import { type PopupProps } from '../popup/common'
import SarStatusBar from '../status-bar/status-bar.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NotifyProps>(), defaultNotifyProps)

defineSlots<NotifySlots>()

const emit = defineEmits<NotifyEmits>()

const bem = createBem('notify')

// main
const effect = computed(() => {
  return {
    top: 'slide-top',
    bottom: 'slide-bottom',
  }[props.position] as PopupProps['effect']
})

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
    if (props.timeout > 0) {
      hideLater()
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.timeout > 0) {
        hideLater()
      }
    }
  },
)

const onVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  emit(name as any)
}

const onClick = (event: any) => {
  emit('click', event)
}

defineExpose<NotifyExpose>({
  reHideLater,
  cancelHide,
})

// others
const notifyClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.type),
    bem.m(props.position),
    props.rootClass,
  )
})

const notifyStyle = computed(() => {
  return stringifyStyle(
    {
      backgroundColor: props.background,
      color: props.color,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
