<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="ReadMore 阅读更多" emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="收起时最大高度">
      <DemoMaxHeight />
    </doc-demo>

    <doc-demo title="按钮文案">
      <DemoText />
    </doc-demo>

    <doc-demo title="隐藏收起按钮">
      <DemoHideClose />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoMaxHeight from './demo/MaxHeight.vue'
import DemoText from './demo/Text.vue'
import DemoHideClose from './demo/HideClose.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
