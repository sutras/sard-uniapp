<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Accordion 手风琴">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="展开多个" full>
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="禁用" full>
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="隐藏边框" full>
      <DemoHideBorder />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoHideBorder from './demo/HideBorder.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
