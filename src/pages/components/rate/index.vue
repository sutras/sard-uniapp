<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Rate 评分">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="半星">
      <DemoAllowHalf />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoCustomIcon />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="自定义尺寸和间距">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义数量">
      <DemoCount />
    </doc-demo>

    <doc-demo title="允许清空">
      <DemoClearable />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoAllowHalf from './demo/AllowHalf.vue'
import DemoCustomIcon from './demo/CustomIcon.vue'
import DemoColor from './demo/Color.vue'
import DemoSize from './demo/Size.vue'
import DemoCount from './demo/Count.vue'
import DemoClearable from './demo/Clearable.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'

const { isLocked } = useCurrentPageLock()
</script>

<style lang="scss" scoped>
:deep() {
  .sar-rate {
    margin-bottom: 40rpx;
  }
}
</style>
