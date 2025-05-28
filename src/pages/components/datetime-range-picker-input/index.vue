<template>
  <doc-page title="DatetimeRangePickerInput 日期时间范围输入框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="输入框日期格式">
      <DemoOutletFormat />
    </doc-demo>

    <doc-demo title="绑定值的格式">
      <DemoValueFormat />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoOutletFormat from './demo/OutletFormat.vue'
import DemoValueFormat from './demo/ValueFormat.vue'
</script>
