<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义位置">
      <DemoPlacement />
    </doc-demo>

    <doc-demo title="加载中的背景">
      <DemoMask />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoPlacement from './demo/Placement.vue'
import DemoMask from './demo/Mask.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
