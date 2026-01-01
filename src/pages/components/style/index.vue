<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Style 样式">
    <doc-demo title="基础颜色">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="灰度色">
      <DemoGray />
    </doc-demo>

    <doc-demo title="主题色">
      <DemoTheme />
    </doc-demo>

    <doc-demo title="中性色">
      <DemoNeutral />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoGray from './demo/Gray.vue'
import DemoTheme from './demo/Theme.vue'
import DemoNeutral from './demo/Neutral.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
