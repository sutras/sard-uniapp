<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="ActionSheet 动作面板">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="取消按钮">
      <DemoCancel />
    </doc-demo>

    <doc-demo title="描述信息">
      <DemoDescription />
    </doc-demo>

    <doc-demo title="动作状态">
      <DemoStatus />
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
import DemoCancel from './demo/Cancel.vue'
import DemoDescription from './demo/Description.vue'
import DemoStatus from './demo/Status.vue'
import DemoImperative from './demo/Imperative.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
