<template>
  <doc-page emphasis title="Slider 滑块">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="范围选择">
      <DemoRange />
    </doc-demo>

    <doc-demo title="显示值">
      <DemoShowValue />
    </doc-demo>

    <doc-demo title="最大最小值">
      <DemoMinMax />
    </doc-demo>

    <doc-demo title="垂直">
      <DemoVertical />
    </doc-demo>

    <doc-demo title="步长">
      <DemoStep />
    </doc-demo>

    <doc-demo title="显示刻度">
      <DemoShowScale />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="自定义尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="自定义按钮插槽">
      <DemoSlot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoRange from './demo/Range.vue'
import DemoShowValue from './demo/ShowValue.vue'
import DemoMinMax from './demo/MinMax.vue'
import DemoVertical from './demo/Vertical.vue'
import DemoStep from './demo/Step.vue'
import DemoShowScale from './demo/ShowScale.vue'
import DemoColor from './demo/Color.vue'
import DemoSize from './demo/Size.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSlot from './demo/Slot.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
