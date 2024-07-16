<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="排列方向">
      <DemoDirection />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="图标大小">
      <DemoSize />
    </doc-demo>

    <doc-demo title="图标颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="图标类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="自动渲染单选按钮">
      <DemoGroupOptions />
    </doc-demo>

    <doc-demo title="自定义 UI">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoDirection from './demo/Direction.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoType from './demo/Type.vue'
import DemoIcon from './demo/Icon.vue'
import DemoGroupOptions from './demo/GroupOptions.vue'
import DemoCustom from './demo/Custom.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
