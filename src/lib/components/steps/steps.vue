<template>
  <view :class="stepsClass" :style="stepsStyle">
    <slot>
      <sar-step
        v-for="(item, i) in itemList"
        :key="i"
        :index="i"
        :status="item.status"
        :name="item.name"
        :description="item.description"
      />
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarStep from '../step/step.vue'
import {
  type StepsProps,
  type StepsSlots,
  defaultStepsProps,
  stepsContextSymbol,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StepsProps>(), defaultStepsProps)

defineSlots<StepsSlots>()

const bem = createBem('steps')

// main
provide(
  stepsContextSymbol,
  reactive({
    current: toRef(() => props.current),
    direction: toRef(() => props.direction),
    center: toRef(() => props.center),
    iconFamily: toRef(() => props.iconFamily),
    iconSize: toRef(() => props.iconSize),
    finishIcon: toRef(() => props.finishIcon),
    processIcon: toRef(() => props.processIcon),
    waitIcon: toRef(() => props.waitIcon),
    errorIcon: toRef(() => props.errorIcon),
    status: toRef(() => props.status),
  }),
)

// others
const stepsClass = computed(() => {
  return classNames(bem.b(), bem.m(props.direction), props.rootClass)
})

const stepsStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
