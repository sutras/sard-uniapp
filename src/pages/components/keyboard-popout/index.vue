<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="KeyboardPopout 键盘弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="插槽">
      <DemoSlot />
    </doc-demo>

    <doc-demo title="类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="车牌号键盘">
      <DemoPlate />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoSlot from './demo/Slot.vue'
import DemoType from './demo/Type.vue'
import DemoPlate from './demo/Plate.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
