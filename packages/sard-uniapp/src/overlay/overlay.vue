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
import { useTransition } from '../use'
import { overlayProps } from './common'

const props = defineProps(overlayProps)

const emit = defineEmits(['click'])

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
    bem.m('visible', props.visible),
    transitionClass.value,
    props.rootClass,
  )
})

const overlayStyle = computed(() => {
  return stringifyStyle(
    {
      zIndex: props.zIndex,
      backgroundColor: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
