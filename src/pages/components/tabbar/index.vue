<template>
  <doc-page title="Tabbar 标签栏">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义图标" full>
      <DemoIcon />
    </doc-demo>

    <doc-demo title="自定义颜色" full>
      <DemoColor />
    </doc-demo>

    <doc-demo title="徽标" full>
      <DemoBadge />
    </doc-demo>

    <doc-demo title="中间鼓起" full>
      <DemoBulge />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoIcon from './demo/Icon.vue'
import DemoColor from './demo/Color.vue'
import DemoBadge from './demo/Badge.vue'
import DemoBulge from './demo/Bulge.vue'
</script>
