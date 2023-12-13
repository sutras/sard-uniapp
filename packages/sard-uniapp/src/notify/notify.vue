<template>
  <Popup :visible="innerVisible" :overlay="false" :effect="effect">
    <view :class="notifyClass" :style="notifyStyle">{{ message }}</view>
  </Popup>
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
import { computed, ref, watch, nextTick } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import { useSetTimeout } from '../use'
import { type NotifyExpose, notifyProps } from './common'
import Popup from '../popup/popup.vue'
import { type PopupProps } from '../popup/common'

const props = defineProps(notifyProps)

const emit = defineEmits(['click', 'update:visible'])

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
    if (props.duration > 0) {
      hideLater(props.duration)
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.duration > 0) {
        hideLater(props.duration)
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
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
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
@use './index.scss';
</style>
