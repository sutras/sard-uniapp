<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="配合下拉刷新一起使用">
      <DemoWithRefresh />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoWithRefresh from './demo/WithRefresh.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
