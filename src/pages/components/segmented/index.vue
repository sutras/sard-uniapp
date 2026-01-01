<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Segmented 分段控制器">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="胶囊形状">
      <DemoShape />
    </doc-demo>

    <doc-demo title="设置图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="只设置图标">
      <DemoOnlyIcon />
    </doc-demo>

    <doc-demo title="垂直方向">
      <DemoDirection />
    </doc-demo>

    <doc-demo title="禁用">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="自定义内容">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoSize from './demo/Size.vue'
import DemoShape from './demo/Shape.vue'
import DemoIcon from './demo/Icon.vue'
import DemoOnlyIcon from './demo/OnlyIcon.vue'
import DemoDirection from './demo/Direction.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoCustom from './demo/Custom.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
