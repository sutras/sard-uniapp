<template>
  <doc-page title="Popout 弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="紧凑类型">
      <DemoCompact />
    </doc-demo>

    <doc-demo title="异步关闭">
      <DemoBeforeClose />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoCompact from './demo/Compact.vue'
import DemoBeforeClose from './demo/BeforeClose.vue'
</script>
