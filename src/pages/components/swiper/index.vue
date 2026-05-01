<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Swiper 轮播图">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="指示点类型">
      <DemoDotType />
    </doc-demo>

    <doc-demo title="标题类型">
      <DemoTitle />
    </doc-demo>

    <doc-demo title="嵌入视频">
      <DemoVideo />
    </doc-demo>

    <doc-demo title="多项展示">
      <DemoMultipleItems />
    </doc-demo>

    <doc-demo title="缩放效果">
      <DemoScale />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoDotType from './demo/DotType.vue'
import DemoTitle from './demo/Title.vue'
import DemoVideo from './demo/Video.vue'
import DemoMultipleItems from './demo/MultipleItems.vue'
import DemoScale from './demo/Scale.vue'

const { isLocked } = useCurrentPageLock()
</script>
