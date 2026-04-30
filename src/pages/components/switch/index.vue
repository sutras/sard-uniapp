<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Switch 开关">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="不同状态的值">
      <DemoValue />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="加载状态">
      <DemoLoading />
    </doc-demo>

    <doc-demo title="带有文字">
      <DemoText />
    </doc-demo>

    <doc-demo title="使用插槽自定义内容">
      <DemoSlots />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoValue from './demo/Value.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoLoading from './demo/Loading.vue'
import DemoText from './demo/Text.vue'
import DemoSlots from './demo/Slots.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
