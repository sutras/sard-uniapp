<template>
  <view :class="_templateClass" :style="_templateStyle">
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
// 1. 替换 _template
// 2. 替换 _Template
// 3. 统一导出css变量: packages/sard-uniapp/src/index.scss
// 4. 统一导出接口: packages/sard-uniapp/src/index.ts
// 5. 统一导出全局组件类型: packages/sard-uniapp/src/global-components.d.ts
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { _templateProps } from './common'

const props = defineProps(_templateProps)

defineEmits(['click'])

const bem = createBem('_template')

// main

// others
const _templateClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const _templateStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
