<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="LoadMore 加载更多">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="配合 PullDownRefresh 组件一起使用">
      <DemoWithRefresh />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoWithRefresh from './demo/WithRefresh.vue'

const { isLocked } = useCurrentPageLock()
</script>
