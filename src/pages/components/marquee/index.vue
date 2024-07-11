<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="异步数据">
      <DemoReset />
    </doc-demo>

    <doc-demo title="水平方向">
      <DemoHorizontal />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoReset from './demo/Reset.vue'
import DemoHorizontal from './demo/Horizontal.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
