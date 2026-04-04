<template>
  <doc-page title="Ellipsis 文本省略">
    <doc-demo title="基础用法">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="展开/收起">
      <DemoExpand />
    </doc-demo>

    <doc-demo title="自定义展示行数">
      <DemoRows />
    </doc-demo>

    <doc-demo title="自定义省略位置">
      <DemoPosition />
    </doc-demo>

    <doc-demo title="自定义省略符号">
      <DemoDots />
    </doc-demo>

    <doc-demo title="动态切换">
      <DemoDynamic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoDots from './demo/Dots.vue'
import DemoExpand from './demo/Expand.vue'
import DemoPosition from './demo/Position.vue'
import DemoRows from './demo/Rows.vue'
import DemoDynamic from './demo/Dynamic.vue'
</script>
