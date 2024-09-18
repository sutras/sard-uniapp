<template>
  <sar-popup
    :visible="innerVisible"
    :overlay="false"
    :effect="effect"
    :duration="duration"
  >
    <view :class="notifyClass" :style="notifyStyle">{{ message }}</view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { useSetTimeout } from '../../use'
import {
  type NotifyExpose,
  type NotifyProps,
  type NotifyEmits,
  defaultNotifyProps,
} from './common'
import SarPopup from '../popup/popup.vue'
import { type PopupProps } from '../popup/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NotifyProps>(), defaultNotifyProps)

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

const [hideLater, cancelHide] = useSetTimeout(() => {
  innerVisible.value = false
  emit('update:visible', false)
})

const reHideLater = () => {
  cancelHide()

  nextTick(() => {
    if (props.timeout > 0) {
      hideLater(props.timeout)
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.timeout > 0) {
        hideLater(props.timeout)
      }
    }
  },
)

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
