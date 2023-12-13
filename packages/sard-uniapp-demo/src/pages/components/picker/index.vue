<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="对象类型">
      <DemoObjectOption />
    </doc-demo>

    <doc-demo title="多列">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="对象类型多列">
      <DemoObjectMultiple />
    </doc-demo>

    <doc-demo title="级联选择">
      <DemoCascaded />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoObjectOption from './demo/ObjectOption.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoObjectMultiple from './demo/ObjectMultiple.vue'
import DemoCascaded from './demo/Cascaded.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-button {
    margin-top: 20rpx;
  }
}
</style>
