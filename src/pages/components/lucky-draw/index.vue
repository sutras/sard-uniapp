<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="LuckyDraw 幸运抽奖">
    <doc-demo title="九宫格">
      <DemoBasicGrid />
    </doc-demo>
    <doc-demo title="自定义宫格行列">
      <DemoGridSize />
    </doc-demo>
    <doc-demo title="大转盘">
      <DemoWheel />
    </doc-demo>
    <doc-demo title="老虎机">
      <DemoSlotMechine />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasicGrid from './demo/BasicGrid.vue'
import DemoGridSize from './demo/GridSize.vue'
import DemoWheel from './demo/Wheel.vue'
import DemoSlotMechine from './demo/SlotMechine.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
