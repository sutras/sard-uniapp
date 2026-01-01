<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Layout 布局">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="列偏移">
      <DemoOffset />
    </doc-demo>

    <doc-demo title="水平对齐">
      <DemoJustify />
    </doc-demo>

    <doc-demo title="垂直对齐">
      <DemoAlign />
    </doc-demo>

    <doc-demo title="列间距">
      <DemoGap />
    </doc-demo>

    <doc-demo title="列顺序">
      <DemoOrder />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoOffset from './demo/Offset.vue'
import DemoJustify from './demo/Justify.vue'
import DemoAlign from './demo/Align.vue'
import DemoGap from './demo/Gap.vue'
import DemoOrder from './demo/Order.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>

<style lang="scss" scoped>
:deep() {
  .sar-row {
    margin-bottom: 10px;
  }
  .layout-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-left: 10rpx;
    margin-right: 10rpx;
    border-radius: var(--sar-rounded);
    color: var(--sar-white);
    background-color: var(--sar-primary);
  }
  .layout-align .sar-col:nth-child(1) .layout-box {
    height: 30px;
  }
  .layout-align .sar-col:nth-child(2) .layout-box {
    height: 60px;
  }
  .layout-align .sar-col:nth-child(3) .layout-box {
    height: 90px;
  }
}
</style>
