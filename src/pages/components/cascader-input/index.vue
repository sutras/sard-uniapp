<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="CascaderInput 级联输入框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="多选">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="懒加载">
      <DemoLazy />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoLazy from './demo/Lazy.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
