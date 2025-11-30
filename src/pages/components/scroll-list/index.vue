<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="ScrollList 横向滚动列表" emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="滚动条颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="异步获取数据">
      <DemoAsync />
    </doc-demo>

    <doc-demo title="隐藏滚动条">
      <DemoHideThumb />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoColor from './demo/Color.vue'
import DemoAsync from './demo/Async.vue'
import DemoHideThumb from './demo/HideThumb.vue'

const { isLocked } = useCurrentPageLock()
</script>
