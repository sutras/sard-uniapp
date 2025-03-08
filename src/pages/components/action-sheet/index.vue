<template>
  <doc-page title="ActionSheet 动作面板">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="取消按钮">
      <DemoCancel />
    </doc-demo>

    <doc-demo title="描述信息">
      <DemoDescription />
    </doc-demo>

    <doc-demo title="动作状态">
      <DemoStatus />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoCancel from './demo/Cancel.vue'
import DemoDescription from './demo/Description.vue'
import DemoStatus from './demo/Status.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
