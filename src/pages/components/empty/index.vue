<template>
  <doc-page title="Empty 空状态">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义描述信息">
      <DemoDescription />
    </doc-demo>

    <doc-demo title="自定义图标大小">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="额外内容">
      <DemoExtra />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoDescription from './demo/Description.vue'
import DemoSize from './demo/Size.vue'
import DemoIcon from './demo/Icon.vue'
import DemoExtra from './demo/Extra.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
