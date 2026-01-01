<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Image 图片">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="图片模式">
      <DemoMode />
    </doc-demo>

    <doc-demo title="图片形状">
      <DemoShape />
    </doc-demo>

    <doc-demo title="懒加载">
      <DemoLazyLoad />
    </doc-demo>

    <doc-demo title="加载中提示">
      <DemoLoading />
    </doc-demo>

    <doc-demo title="加载错误提示">
      <DemoError />
    </doc-demo>

    <doc-demo title="淡入动画">
      <DemoFade />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoMode from './demo/Mode.vue'
import DemoShape from './demo/Shape.vue'
import DemoLazyLoad from './demo/LazyLoad.vue'
import DemoLoading from './demo/Loading.vue'
import DemoError from './demo/Error.vue'
import DemoFade from './demo/Fade.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
