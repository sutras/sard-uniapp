<template>
  <doc-page emphasis title="Switch 开关">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="不同状态的值">
      <DemoValue />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="加载状态">
      <DemoLoading />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoValue from './demo/Value.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoLoading from './demo/Loading.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
