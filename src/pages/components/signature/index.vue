<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Signature 签名">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="画笔颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="画笔粗细">
      <DemoLineWidth />
    </doc-demo>

    <doc-demo title="背景色">
      <DemoBackground />
    </doc-demo>

    <doc-demo title="全屏显示">
      <DemoFullScreen />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoColor from './demo/Color.vue'
import DemoLineWidth from './demo/LineWidth.vue'
import DemoBackground from './demo/Background.vue'
import DemoFullScreen from './demo/FullScreen.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
