<template>
  <doc-page title="Signature 签名">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="画笔颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="画笔粗细">
      <DemoLineWidth />
    </doc-demo>

    <doc-demo title="背景色">
      <DemoBackground />
    </doc-demo>

    <doc-demo title="全屏显示">
      <DemoFullScreen />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoColor from './demo/Color.vue'
import DemoLineWidth from './demo/LineWidth.vue'
import DemoBackground from './demo/Background.vue'
import DemoFullScreen from './demo/FullScreen.vue'
</script>
