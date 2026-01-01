<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Table 表格">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
    <doc-demo title="边框">
      <DemoBorder />
    </doc-demo>
    <doc-demo title="下边框">
      <DemoUnderline />
    </doc-demo>
    <doc-demo title="有条纹的">
      <DemoStriped />
    </doc-demo>
    <doc-demo title="单元格条纹">
      <DemoCellStriped />
    </doc-demo>
    <doc-demo title="自定义宽度">
      <DemoWidth />
    </doc-demo>
    <doc-demo title="固定表头">
      <DemoFixedHeader />
    </doc-demo>
    <doc-demo title="固定列">
      <DemoFixedColumn />
    </doc-demo>
    <doc-demo title="固定表头和列">
      <DemoFixed />
    </doc-demo>
    <doc-demo title="满屏表格">
      <DemoFullScreenEntry />
    </doc-demo>
    <doc-demo title="多级表头">
      <DemoMultilevelHeader />
    </doc-demo>
    <doc-demo title="合并行或列">
      <DemoMerge />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoBorder from './demo/Border.vue'
import DemoUnderline from './demo/Underline.vue'
import DemoStriped from './demo/Striped.vue'
import DemoCellStriped from './demo/CellStriped.vue'
import DemoWidth from './demo/Width.vue'
import DemoFixedHeader from './demo/FixedHeader.vue'
import DemoFixedColumn from './demo/FixedColumn.vue'
import DemoFixed from './demo/Fixed.vue'
import DemoFullScreenEntry from './demo/FullScreenEntry.vue'
import DemoMultilevelHeader from './demo/MultilevelHeader.vue'
import DemoMerge from './demo/Merge.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
