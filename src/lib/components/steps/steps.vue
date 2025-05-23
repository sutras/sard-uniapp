<template>
  <view :class="stepsClass" :style="stepsStyle">
    <view
      v-for="(item, i) in itemList"
      :key="i"
      :class="
        classNames(
          bem.e('step'),
          bem.em('step', item.status ?? getStatus(current, i)),
          bem.em('step', getPosition(current, i)),
        )
      "
    >
      <view :class="bem.e('header')">
        <view :class="classNames(bem.e('line'), bem.e('line-before'))"></view>
        <view :class="bem.e('icon')">
          <sar-icon
            :family="iconFamily || 'sari'"
            :name="getStatusIcon(item.status ?? getStatus(current, i))"
            :size="iconSize"
          />
        </view>
        <view :class="classNames(bem.e('line'), bem.e('line-after'))"></view>
      </view>
      <view :class="bem.e('body')">
        <view :class="bem.e('name')">{{ item.name }}</view>
        <view v-if="item.description" :class="bem.e('description')">
          {{ item.description }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import { type StepsProps, type StepsStatus, defaultStepsProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StepsProps>(), defaultStepsProps)

const getStatus = (current: number, index: number) => {
  return index < current
    ? 'finish'
    : index === current
    ? props.status ?? 'process'
    : 'wait'
}

const getStatusIcon = (status: StepsStatus) => {
  return {
    finish: props.finishIcon,
    process: props.processIcon,
    wait: props.waitIcon,
    error: props.errorIcon,
  }[status]
}

const getPosition = (current: number, index: number) => {
  return index < current ? 'behind' : current === index ? 'self' : 'front'
}

const bem = createBem('steps')

// main

// others
const stepsClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.direction),
    bem.m('center', props.center),
    props.rootClass,
  )
})

const stepsStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
