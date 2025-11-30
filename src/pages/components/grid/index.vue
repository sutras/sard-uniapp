<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Grid 宫格">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义列数">
      <DemoColumns />
    </doc-demo>

    <doc-demo title="正方形格子">
      <DemoSquare />
    </doc-demo>

    <doc-demo title="格子间距">
      <DemoGap />
    </doc-demo>

    <doc-demo title="显示边框">
      <DemoBorder />
    </doc-demo>

    <doc-demo title="内容横排">
      <DemoHorizontal />
    </doc-demo>

    <doc-demo title="内容翻转">
      <DemoReverse />
    </doc-demo>

    <doc-demo title="可点击的">
      <DemoClickable />
    </doc-demo>

    <doc-demo title="徽标提示">
      <DemoBadge />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoBorder from './demo/Border.vue'
import DemoColumns from './demo/Columns.vue'
import DemoSquare from './demo/Square.vue'
import DemoGap from './demo/Gap.vue'
import DemoHorizontal from './demo/Horizontal.vue'
import DemoReverse from './demo/Reverse.vue'
import DemoClickable from './demo/Clickable.vue'
import DemoBadge from './demo/Badge.vue'
import DemoCustom from './demo/Custom.vue'

const { isLocked } = useCurrentPageLock()
</script>

<style lang="scss" scoped>
:deep() {
  .sar-grid {
    margin-bottom: 40rpx;
  }
}
</style>
