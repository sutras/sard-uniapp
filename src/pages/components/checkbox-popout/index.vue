<template>
  <doc-page title="CheckboxPopout 复选弹出框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="全选">
      <DemoCheckAll />
    </doc-demo>

    <doc-demo title="禁用选项">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="可搜索的">
      <DemoSearch />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoCheckAll from './demo/CheckAll.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoSearch from './demo/Search.vue'
</script>
