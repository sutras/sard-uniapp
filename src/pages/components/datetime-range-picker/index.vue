<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="DatetimeRangePicker 日期时间范围选择器">
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
