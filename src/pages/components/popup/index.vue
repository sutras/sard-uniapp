<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Popup 弹出层">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="命令式">
      <DemoImperative />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoImperative from './demo/Imperative.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
