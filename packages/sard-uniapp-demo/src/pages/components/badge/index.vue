<template>
  <doc-page emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="最大值">
      <DemoMax />
    </doc-demo>

    <doc-demo title="值为0时不隐藏">
      <DemoShowZero />
    </doc-demo>

    <doc-demo title="圆点显示">
      <DemoDot />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="独立展示">
      <DemoOnlyBadge />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoCustom />
    </doc-demo>

    <doc-demo title="不包裹组件">
      <DemoUnWrap />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoMax from './demo/Max.vue'
import DemoShowZero from './demo/ShowZero.vue'
import DemoDot from './demo/Dot.vue'
import DemoColor from './demo/Color.vue'
import DemoOnlyBadge from './demo/OnlyBadge.vue'
import DemoCustom from './demo/Custom.vue'
import DemoUnWrap from './demo/UnWrap.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-badge__wrapper {
    margin-right: 20rpx;
  }
}
</style>
