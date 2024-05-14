<template>
  <doc-page>
    <sar-notify-agent />
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="自定义时长">
      <DemoDuration />
    </doc-demo>

    <doc-demo title="自定义位置">
      <DemoPlacement />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoColor from './demo/Color.vue'
import DemoDuration from './demo/Duration.vue'
import DemoPlacement from './demo/Placement.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
