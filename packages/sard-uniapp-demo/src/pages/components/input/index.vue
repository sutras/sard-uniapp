<template>
  <doc-page emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="可清除的">
      <DemoClearable />
    </doc-demo>

    <doc-demo title="聚焦时显示清除按钮">
      <DemoShowClearOnlyFocus />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="插槽">
      <DemoSlot />
    </doc-demo>

    <doc-demo title="去除边框">
      <DemoBorderless />
    </doc-demo>

    <doc-demo title="嵌入的">
      <DemoInlaid />
    </doc-demo>

    <doc-demo title="多行文本">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="自动高度">
      <DemoAutoHeight />
    </doc-demo>

    <doc-demo title="字数提示">
      <DemoShowCount />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoStyle from './demo/Style.vue'
import DemoType from './demo/Type.vue'
import DemoClearable from './demo/Clearable.vue'
import DemoShowClearOnlyFocus from './demo/ShowClearOnlyFocus.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSlot from './demo/Slot.vue'
import DemoBorderless from './demo/Borderless.vue'
import DemoInlaid from './demo/Inlaid.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoAutoHeight from './demo/AutoHeight.vue'
import DemoShowCount from './demo/ShowCount.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-input ~ .sar-input {
    margin-top: 20rpx;
  }
}
</style>
