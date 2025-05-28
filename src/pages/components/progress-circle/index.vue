<template>
  <doc-page emphasis title="ProgressCircle 环形进度条">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="粗细">
      <DemoThickness />
    </doc-demo>

    <doc-demo title="颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="状态">
      <DemoStatus />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoThickness from './demo/Thickness.vue'
import DemoColor from './demo/Color.vue'
import DemoSize from './demo/Size.vue'
import DemoStatus from './demo/Status.vue'
</script>
