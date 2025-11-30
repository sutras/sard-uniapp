<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="DatetimePickerPopout 日期时间弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="自定义日期范围">
      <DemoMinMax />
    </doc-demo>

    <doc-demo title="过滤器">
      <DemoFilter />
    </doc-demo>

    <doc-demo title="格式化">
      <DemoFormatter />
    </doc-demo>

    <doc-demo title="农历">
      <DemoCalendar />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoMinMax from './demo/MinMax.vue'
import DemoFilter from './demo/Filter.vue'
import DemoFormatter from './demo/Formatter.vue'
import DemoCalendar from './demo/Calendar.vue'

const { isLocked } = useCurrentPageLock()
</script>
