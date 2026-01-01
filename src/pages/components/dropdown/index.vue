<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Dropdown 下拉菜单">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="占位符" full>
      <DemoPlaceholder />
    </doc-demo>

    <doc-demo title="添加 label" full>
      <DemoLabel />
    </doc-demo>

    <doc-demo title="向上展开" full>
      <DemoDirection />
    </doc-demo>

    <doc-demo title="禁用" full>
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <DemoContent />
    </doc-demo>

    <doc-demo title="异步开关" full>
      <DemoAsync />
    </doc-demo>

    <doc-demo title="可取消选择" full>
      <DemoTogglable />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoPlaceholder from './demo/Placeholder.vue'
import DemoLabel from './demo/Label.vue'
import DemoDirection from './demo/Direction.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoContent from './demo/Content.vue'
import DemoAsync from './demo/Async.vue'
import DemoTogglable from './demo/Togglable.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
