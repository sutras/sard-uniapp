<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Checkbox 复选框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="图标大小">
      <DemoSize />
    </doc-demo>

    <doc-demo title="图标颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="图标类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="复选框组">
      <DemoGroup />
    </doc-demo>

    <doc-demo title="排列方向">
      <DemoDirection />
    </doc-demo>

    <doc-demo title="自动渲染复选框">
      <DemoGroupOptions />
    </doc-demo>

    <doc-demo title="自定义">
      <DemoCustom />
    </doc-demo>

    <doc-demo title="不确定状态">
      <DemoIndeterminate />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSize from './demo/Size.vue'
import DemoColor from './demo/Color.vue'
import DemoType from './demo/Type.vue'
import DemoIcon from './demo/Icon.vue'
import DemoGroup from './demo/Group.vue'
import DemoDirection from './demo/Direction.vue'
import DemoGroupOptions from './demo/GroupOptions.vue'
import DemoCustom from './demo/Custom.vue'
import DemoIndeterminate from './demo/Indeterminate.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
