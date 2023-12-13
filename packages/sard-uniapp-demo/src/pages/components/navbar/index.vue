<template>
  <doc-page>
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="导航项" full>
      <DemoItem />
    </doc-demo>

    <doc-demo title="流动导航" full>
      <DemoFlow />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <DemoContent />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoItem from './demo/Item.vue'
import DemoFlow from './demo/Flow.vue'
import DemoContent from './demo/Content.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
