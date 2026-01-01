<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Space 间距">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
    <doc-demo title="垂直布局">
      <DemoVertical />
    </doc-demo>
    <doc-demo title="间距大小">
      <DemoSize />
    </doc-demo>
    <doc-demo title="自定义间距大小">
      <DemoCustomSize />
    </doc-demo>
    <doc-demo title="自动换行">
      <DemoWrap />
    </doc-demo>
    <doc-demo title="对齐">
      <DemoAlign />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoVertical from './demo/Vertical.vue'
import DemoSize from './demo/Size.vue'
import DemoCustomSize from './demo/CustomSize.vue'
import DemoWrap from './demo/Wrap.vue'
import DemoAlign from './demo/Align.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
