<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="异步加载">
      <DemoAsync />
    </doc-demo>

    <doc-demo title="自定义面板上方内容">
      <DemoOptionTop />
    </doc-demo>

    <doc-demo title="禁选选项">
      <DemoDisabled />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoAsync from './demo/Async.vue'
import DemoOptionTop from './demo/OptionTop.vue'
import DemoDisabled from './demo/Disabled.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-button {
    margin-top: 20rpx;
  }
}
</style>
