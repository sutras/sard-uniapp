<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Avatar 头像">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="形状">
      <DemoShape />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="图片类型">
      <DemoPicture />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoChildren />
    </doc-demo>

    <doc-demo title="额外内容">
      <DemoExtra />
    </doc-demo>

    <doc-demo title="头像组">
      <DemoGroup />
    </doc-demo>

    <doc-demo title="实际头像数不超过最大数">
      <DemoGroupLess />
    </doc-demo>

    <doc-demo title="覆盖面">
      <DemoGroupCoverage />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoShape from './demo/Shape.vue'
import DemoSize from './demo/Size.vue'
import DemoStyle from './demo/Style.vue'
import DemoPicture from './demo/Picture.vue'
import DemoChildren from './demo/Children.vue'
import DemoExtra from './demo/Extra.vue'
import DemoGroup from './demo/Group.vue'
import DemoGroupLess from './demo/GroupLess.vue'
import DemoGroupCoverage from './demo/GroupCoverage.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
