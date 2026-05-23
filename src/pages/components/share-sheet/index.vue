<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="ShareSheet 分享面板">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="取消按钮">
      <DemoCancel />
    </doc-demo>

    <doc-demo title="多行">
      <DemoMultipleRow />
    </doc-demo>

    <doc-demo title="标题和描述">
      <DemoTitleDescription />
    </doc-demo>

    <doc-demo title="图片类型图标">
      <DemoPicture />
    </doc-demo>

    <doc-demo title="禁用">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="命令式">
      <DemoImperative />
    </doc-demo>

    <doc-demo title="插槽">
      <DemoSlot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoCancel from './demo/Cancel.vue'
import DemoMultipleRow from './demo/MultipleRow.vue'
import DemoTitleDescription from './demo/TitleDescription.vue'
import DemoPicture from './demo/Picture.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoImperative from './demo/Imperative.vue'
import DemoSlot from './demo/Slot.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
