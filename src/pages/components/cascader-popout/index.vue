<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="CascaderPopout 级联弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="多选">
      <DemoMultiple />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoMultiple from './demo/Multiple.vue'

const { isLocked } = useCurrentPageLock()
</script>
