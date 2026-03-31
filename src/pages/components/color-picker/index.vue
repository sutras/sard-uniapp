<template>
  <doc-page title="ColorPicker 颜色选择器">
    <doc-demo title="基础用法">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="选择透明度">
      <DemoAlpha />
    </doc-demo>

    <doc-demo title="预定义颜色">
      <DemoPresets />
    </doc-demo>

    <doc-demo title="颜色的格式">
      <DemoFormats />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoAlpha from './demo/Alpha.vue'
import DemoBasic from './demo/Basic.vue'
import DemoFormats from './demo/Formats.vue'
import DemoPresets from './demo/Presets.vue'
</script>
