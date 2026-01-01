<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Navbar 头部导航">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="返回按钮" full>
      <DemoBack />
    </doc-demo>

    <doc-demo title="导航项" full>
      <DemoItem />
    </doc-demo>

    <doc-demo title="流动导航" full>
      <DemoFlow />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <DemoContent />
    </doc-demo>

    <doc-demo title="背景色" full>
      <DemoBackground />
    </doc-demo>

    <doc-demo title="文本颜色" full>
      <DemoColor />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoBack from './demo/Back.vue'
import DemoItem from './demo/Item.vue'
import DemoFlow from './demo/Flow.vue'
import DemoContent from './demo/Content.vue'
import DemoBackground from './demo/Background.vue'
import DemoColor from './demo/Color.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
