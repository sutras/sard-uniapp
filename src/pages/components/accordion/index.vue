<template>
  <doc-page title="Accordion 手风琴">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="展开多个" full>
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="禁用" full>
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="隐藏边框" full>
      <DemoHideBorder />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoHideBorder from './demo/HideBorder.vue'
</script>
