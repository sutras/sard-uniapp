<template>
  <doc-page title="Sticky 粘性布局" padding-bottom="120vh">
    <doc-demo title="吸顶">
      <DemoOffsetTop />
    </doc-demo>

    <doc-demo title="动态插入">
      <DemoDynamic />
    </doc-demo>

    <doc-demo title="吸底">
      <DemoOffsetBottom />
    </doc-demo>

    <doc-demo title="吸顶和吸底">
      <DemoOffsetTopBottom />
    </doc-demo>

    <doc-demo title="容器中的吸顶">
      <DemoBoxTop />
    </doc-demo>

    <doc-demo title="容器中的吸底">
      <DemoBoxBottom />
    </doc-demo>

    <doc-demo title="容器中的吸顶和吸底">
      <DemoBoxTopBottom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoOffsetTop from './demo/OffsetTop.vue'
import DemoDynamic from './demo/Dynamic.vue'
import DemoOffsetBottom from './demo/OffsetBottom.vue'
import DemoOffsetTopBottom from './demo/OffsetTopBottom.vue'
import DemoBoxTop from './demo/BoxTop.vue'
import DemoBoxBottom from './demo/BoxBottom.vue'
import DemoBoxTopBottom from './demo/BoxTopBottom.vue'
</script>
