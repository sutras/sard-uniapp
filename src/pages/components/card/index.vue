<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Card 卡片">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="额外内容">
      <DemoExtra />
    </doc-demo>

    <doc-demo title="只有主体">
      <DemoOnlyBody />
    </doc-demo>

    <doc-demo title="底部">
      <DemoFooter />
    </doc-demo>

    <doc-demo title="可点击的">
      <DemoHover />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="折叠">
      <DemoCollapsed />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoExtra from './demo/Extra.vue'
import DemoOnlyBody from './demo/OnlyBody.vue'
import DemoFooter from './demo/Footer.vue'
import DemoHover from './demo/Hover.vue'
import DemoStyle from './demo/Style.vue'
import DemoCollapsed from './demo/Collapsed.vue'

const { isLocked } = useCurrentPageLock()
</script>
