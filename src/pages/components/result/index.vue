<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Result 结果">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="额外内容">
      <DemoExtra />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoExtra from './demo/Extra.vue'
import DemoIcon from './demo/Icon.vue'

const { isLocked } = useCurrentPageLock()
</script>

<style lang="scss" scoped>
:deep() {
  .sar-result {
    margin-bottom: 60rpx;
  }
}
</style>
