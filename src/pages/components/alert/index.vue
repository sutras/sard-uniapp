<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Alert 警告提示">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
    <doc-demo title="类型">
      <DemoType />
    </doc-demo>
    <doc-demo title="显示图标">
      <DemoShowIcon />
    </doc-demo>
    <doc-demo title="可关闭的">
      <DemoClosable />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoShowIcon from './demo/ShowIcon.vue'
import DemoClosable from './demo/Closable.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>

<style lang="scss" scoped>
:deep() {
  .sar-alert {
    margin-bottom: 10px;
  }
}
</style>
