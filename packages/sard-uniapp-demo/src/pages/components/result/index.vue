<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="额外内容">
      <DemoExtra />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoExtra from './demo/Extra.vue'
import DemoIcon from './demo/Icon.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-result {
    margin-bottom: 60rpx;
  }
}
</style>
