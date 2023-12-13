<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="镂空">
      <DemoPlain />
    </doc-demo>

    <doc-demo title="圆角">
      <DemoRound />
    </doc-demo>

    <doc-demo title="标记样式（半圆角）">
      <DemoMark />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="可关闭的">
      <DemoClosable />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoPlain from './demo/Plain.vue'
import DemoRound from './demo/Round.vue'
import DemoMark from './demo/Mark.vue'
import DemoSize from './demo/Size.vue'
import DemoStyle from './demo/Style.vue'
import DemoClosable from './demo/Closable.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-tag {
    margin-right: 10rpx;
    margin-bottom: 10rpx;
  }
}
</style>
