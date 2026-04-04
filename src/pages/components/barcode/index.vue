<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Barcode 条形码">
    <doc-demo title="基础用法">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="条形码类型">
      <DemoFormat />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="文本">
      <DemoText />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoFormat from './demo/Format.vue'
import DemoStyle from './demo/Style.vue'
import DemoText from './demo/Text.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
