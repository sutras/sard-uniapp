<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Collapse 折叠">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'

const { isLocked } = useCurrentPageLock()
</script>
