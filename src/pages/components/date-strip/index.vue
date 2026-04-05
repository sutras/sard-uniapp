<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="DateStrip 日期横条">
    <doc-demo title="基础用法">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义日期范围">
      <DemoMinMax />
    </doc-demo>

    <doc-demo title="最多选择天数">
      <DemoMaxDays />
    </doc-demo>

    <doc-demo title="禁用日期">
      <DemoDisabledDate />
    </doc-demo>

    <doc-demo title="过滤日期">
      <DemoFilterDate />
    </doc-demo>

    <doc-demo title="格式化日期">
      <DemoFormatter />
    </doc-demo>

    <doc-demo title="展示农历">
      <DemoShowLunar />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoMinMax from './demo/MinMax.vue'
import DemoMaxDays from './demo/MaxDays.vue'
import DemoDisabledDate from './demo/DisabledDate.vue'
import DemoFilterDate from './demo/FilterDate.vue'
import DemoFormatter from './demo/Formatter.vue'
import DemoShowLunar from './demo/ShowLunar.vue'
import DemoStyle from './demo/Style.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
