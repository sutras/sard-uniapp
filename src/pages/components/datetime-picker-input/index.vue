<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="DatetimePickerInput 日期时间输入框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="输入框日期格式">
      <DemoOutletFormat />
    </doc-demo>

    <doc-demo title="绑定值的格式">
      <DemoValueFormat />
    </doc-demo>

    <doc-demo title="min、max 联动">
      <DemoRange />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoOutletFormat from './demo/OutletFormat.vue'
import DemoValueFormat from './demo/ValueFormat.vue'
import DemoRange from './demo/Range.vue'

const { isLocked } = useCurrentPageLock()
</script>
