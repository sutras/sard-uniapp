<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="SlideVerify 滑动验证">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="显示目标">
      <DemoShowTarget />
    </doc-demo>

    <doc-demo title="错误时不重置">
      <DemoShowError />
    </doc-demo>

    <doc-demo title="自定义主题色">
      <DemoTheme />
    </doc-demo>

    <doc-demo title="自定义插槽内容">
      <DemoSlot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoShowTarget from './demo/ShowTarget.vue'
import DemoShowError from './demo/ShowError.vue'
import DemoTheme from './demo/Theme.vue'
import DemoSlot from './demo/Slot.vue'

const { isLocked } = useCurrentPageLock()
</script>
