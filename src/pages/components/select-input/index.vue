<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="SelectInput 列表选择输入框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义插槽">
      <DemoCustom />
    </doc-demo>

    <doc-demo title="多选">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="远程">
      <DemoRemote />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoCustom from './demo/Custom.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoRemote from './demo/Remote.vue'

const { isLocked } = useCurrentPageLock()
</script>
