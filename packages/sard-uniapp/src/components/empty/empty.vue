<template>
  <view :class="emptyClass" :style="emptyStyle">
    <view :class="bem.e('icon')" :style="iconStyle">
      <slot name="icon">
        <sar-icon :name="icon" :family="iconFamily" />
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

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useTranslate } from '../locale'
import { emptyProps } from './common'

const { t } = useTranslate('empty')

const props = defineProps(emptyProps)

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
