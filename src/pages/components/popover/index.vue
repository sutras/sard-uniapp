<template>
  <doc-page title="Popover 气泡弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="暗黑模式">
      <DemoDark />
    </doc-demo>

    <doc-demo title="展示图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="禁用选项">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="水平排列">
      <DemoHorizontal />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoContent />
    </doc-demo>

    <doc-demo title="弹出位置">
      <DemoPosition />
    </doc-demo>

    <doc-demo title="自定义reference">
      <DemoCustomReference />
    </doc-demo>

    <doc-demo title="手动定义位置">
      <DemoManual />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoDark from './demo/Dark.vue'
import DemoIcon from './demo/Icon.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoHorizontal from './demo/Horizontal.vue'
import DemoContent from './demo/Content.vue'
import DemoCustomReference from './demo/CustomReference.vue'
import DemoPosition from './demo/Position.vue'
import DemoManual from './demo/Manual.vue'
</script>

<style lang="scss" scoped>
page {
  padding-bottom: 200rpx;
}
// :deep() {

// }
</style>
