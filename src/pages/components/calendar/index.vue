<template>
  <doc-page title="Calendar 日历">
    <doc-demo title="基础使用">
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

    <doc-demo title="自定义起始周">
      <DemoWeekStartsOn />
    </doc-demo>

    <doc-demo title="格式化日期">
      <DemoFormatter />
    </doc-demo>

    <doc-demo title="展示多个月">
      <DemoSeveral />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoType from './demo/Type.vue'
import DemoMinMax from './demo/MinMax.vue'
import DemoMaxDays from './demo/MaxDays.vue'
import DemoDisabledDate from './demo/DisabledDate.vue'
import DemoWeekStartsOn from './demo/WeekStartsOn.vue'
import DemoFormatter from './demo/Formatter.vue'
import DemoSeveral from './demo/Several.vue'
</script>

<style lang="scss" scoped>
// :deep() {
// }
</style>
