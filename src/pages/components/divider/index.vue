<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Divider 分割线" emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="展示文本">
      <DemoText />
    </doc-demo>

    <doc-demo title="内容位置">
      <DemoPosition />
    </doc-demo>

    <doc-demo title="线条类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="垂直">
      <DemoVertical />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoText from './demo/Text.vue'
import DemoPosition from './demo/Position.vue'
import DemoType from './demo/Type.vue'
import DemoStyle from './demo/Style.vue'
import DemoVertical from './demo/Vertical.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
