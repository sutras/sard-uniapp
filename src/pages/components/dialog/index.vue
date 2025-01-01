<template>
  <doc-page>
    <sar-dialog-agent />

    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="异步关闭">
      <DemoAsyncClose />
    </doc-demo>

    <doc-demo title="圆角按钮">
      <DemoRound />
    </doc-demo>

    <doc-demo title="有头部的">
      <DemoHeaded />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoContent />
    </doc-demo>

    <doc-demo title="自定义按钮属性">
      <DemoButtonProps />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoAsyncClose from './demo/AsyncClose.vue'
import DemoRound from './demo/Round.vue'
import DemoHeaded from './demo/Headed.vue'
import DemoContent from './demo/Content.vue'
import DemoButtonProps from './demo/ButtonProps.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
