<template>
  <doc-page title="ScrollList 横向滚动列表">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="滚动条颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="滚动条模式">
      <DemoMode />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoColor from './demo/Color.vue'
import DemoMode from './demo/Mode.vue'
</script>
