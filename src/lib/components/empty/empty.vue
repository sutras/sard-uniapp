<template>
  <view :class="emptyClass" :style="emptyStyle">
    <view :class="bem.e('icon')" :style="iconStyle">
      <slot name="icon">
        <sar-icon :family="iconFamily" :name="icon" />
      </slot>
    </view>
    <slot name="description">
      <view :class="bem.e('description')">
        {{ description || t('noData') }}
      </view>
    </slot>
    <view v-if="$slots.default" :class="bem.e('extra')">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useTranslate } from '../locale'
import { type EmptyProps, type EmptySlots, defaultEmptyProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const { t } = useTranslate('empty')
const props = withDefaults(defineProps<EmptyProps>(), defaultEmptyProps)

defineSlots<EmptySlots>()

const bem = createBem('empty')

// main

// others
const emptyClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const emptyStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const iconStyle = computed(() => {
  return stringifyStyle({
    fontSize: props.iconSize,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
