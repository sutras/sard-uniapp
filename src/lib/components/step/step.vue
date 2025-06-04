<template>
  <view :class="stepClass" :style="stepStyle">
    <view :class="bem.e('header')">
      <view :class="classNames(bem.e('line'), bem.e('line-before'))"></view>
      <view :class="bem.e('icon')">
        <slot name="icon" :status="currentStatus">
          <sar-icon
            :family="context.iconFamily"
            :name="statusIcon"
            :size="context.iconSize"
          />
        </slot>
      </view>
      <view :class="classNames(bem.e('line'), bem.e('line-after'))"></view>
    </view>
    <view :class="bem.e('body')">
      <slot :status="currentStatus">
        <view :class="bem.e('name')">{{ name }}</view>
        <view v-if="description" :class="bem.e('description')">
          {{ description }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import SarIcon from '../icon/icon.vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type StepProps,
  type StepSlots,
  type StepEmits,
  type StepExpose,
} from './common'
import { stepsContextSymbol } from '../steps/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StepProps>(), {})

defineSlots<StepSlots>()

defineEmits<StepEmits>()

defineExpose<StepExpose>({})

const bem = createBem('step')

// main
const context = inject(stepsContextSymbol)!

if (!context) {
  throw new Error('Step must be included in Steps.')
}

const currentStatus = computed(() => {
  return (
    props.status ??
    (props.index < context.current
      ? 'finish'
      : props.index === context.current
        ? (context.status ?? 'process')
        : 'wait')
  )
})

const statusIcon = computed(() => {
  return {
    finish: context.finishIcon,
    process: context.processIcon,
    wait: context.waitIcon,
    error: context.errorIcon,
  }[currentStatus.value]
})

const position = computed(() => {
  return props.index < context.current
    ? 'behind'
    : context.current === props.index
      ? 'self'
      : 'front'
})

// others
const stepClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('center', context.center),
    bem.m(currentStatus.value),
    bem.m(position.value),
    bem.m(context.direction),
    props.rootClass,
  )
})

const stepStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
