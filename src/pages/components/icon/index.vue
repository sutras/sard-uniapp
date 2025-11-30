<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Icon 图标">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="图片类型图标">
      <DemoImage />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoCustom />
    </doc-demo>

    <doc-demo title="冒号分隔">
      <DemoColon />
    </doc-demo>

    <doc-demo title="内置图标">
      <DemoInbuild />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoImage from './demo/Image.vue'
import DemoCustom from './demo/Custom.vue'
import DemoColon from './demo/Colon.vue'
import DemoInbuild from './demo/Inbuild.vue'

const { isLocked } = useCurrentPageLock()
</script>
