<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Pagination 分页">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="显示省略号">
      <DemoEllipsis />
    </doc-demo>

    <doc-demo title="简单分页">
      <DemoSimple />
    </doc-demo>

    <doc-demo title="自定义">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoEllipsis from './demo/Ellipsis.vue'
import DemoSimple from './demo/Simple.vue'
import DemoCustom from './demo/Custom.vue'

const { isLocked } = useCurrentPageLock()
</script>
