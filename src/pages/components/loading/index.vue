<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Loading 加载">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="加载类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="加载文案">
      <DemoText />
    </doc-demo>

    <doc-demo title="垂直排布">
      <DemoVertical />
    </doc-demo>

    <doc-demo title="加载尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoText from './demo/Text.vue'
import DemoVertical from './demo/Vertical.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoCustom from './demo/Custom.vue'

const { isLocked } = useCurrentPageLock()
</script>

<style lang="scss" scoped>
:deep() {
  .sar-loading {
    margin-right: 20rpx;
  }
}
</style>
