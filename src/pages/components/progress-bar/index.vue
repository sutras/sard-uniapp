<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="ProgressBar 条形进度条">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="内部文本">
      <DemoInside />
    </doc-demo>

    <doc-demo title="隐藏文本">
      <DemoShowText />
    </doc-demo>

    <doc-demo title="粗细">
      <DemoThickness />
    </doc-demo>

    <doc-demo title="颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="有条纹的">
      <DemoStriped />
    </doc-demo>

    <doc-demo title="状态">
      <DemoStatus />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoInside from './demo/Inside.vue'
import DemoShowText from './demo/ShowText.vue'
import DemoThickness from './demo/Thickness.vue'
import DemoColor from './demo/Color.vue'
import DemoStriped from './demo/Striped.vue'
import DemoStatus from './demo/Status.vue'

const { isLocked } = useCurrentPageLock()
</script>
