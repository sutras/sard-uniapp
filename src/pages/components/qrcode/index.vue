<template>
  <doc-page title="Qrcode 二维码">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="呈现的大小">
      <DemoDisplaySize />
    </doc-demo>

    <doc-demo title="画板的大小">
      <DemoCanvasSize />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="添加图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="安静区域模块数">
      <DemoQuietZoneModules />
    </doc-demo>

    <doc-demo title="错误纠错级别">
      <DemoECL />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoDisplaySize from './demo/DisplaySize.vue'
import DemoCanvasSize from './demo/CanvasSize.vue'
import DemoColor from './demo/Color.vue'
import DemoIcon from './demo/Icon.vue'
import DemoQuietZoneModules from './demo/QuietZoneModules.vue'
import DemoECL from './demo/ECL.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
