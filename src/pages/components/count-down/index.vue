<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义格式">
      <DemoFormat />
    </doc-demo>

    <doc-demo title="毫秒级别的渲染">
      <DemoMillisecond />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="手动控制">
      <DemoControl />
    </doc-demo>

    <doc-demo title="验证码倒计时">
      <DemoCaptcha />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoFormat from './demo/Format.vue'
import DemoMillisecond from './demo/Millisecond.vue'
import DemoStyle from './demo/Style.vue'
import DemoControl from './demo/Control.vue'
import DemoCaptcha from './demo/Captcha.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
