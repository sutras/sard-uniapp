<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="可滚动标签栏">
      <DemoScrollable />
    </doc-demo>

    <doc-demo title="禁用标签">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="药丸类型">
      <DemoPill />
    </doc-demo>

    <doc-demo title="卡片类型">
      <DemoCard />
    </doc-demo>

    <doc-demo title="自定义标签">
      <DemoCustomTab />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoScrollable from './demo/Scrollable.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoPill from './demo/Pill.vue'
import DemoCard from './demo/Card.vue'
import DemoCustomTab from './demo/CustomTab.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
