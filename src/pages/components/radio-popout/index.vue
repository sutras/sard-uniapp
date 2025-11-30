<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="RadioPopout 单选弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="禁用选项">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="可搜索的">
      <DemoSearch />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoSearch from './demo/Search.vue'

const { isLocked } = useCurrentPageLock()
</script>
