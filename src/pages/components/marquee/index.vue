<template>
  <doc-page title="Marquee 跑马灯">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="异步数据">
      <DemoAsync />
    </doc-demo>

    <doc-demo title="水平方向">
      <DemoHorizontal />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoAsync from './demo/Async.vue'
import DemoHorizontal from './demo/Horizontal.vue'
</script>
