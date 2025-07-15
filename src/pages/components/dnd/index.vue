<template>
  <doc-page title="Dnd 拖放">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="表单列表" full>
      <DemoFormList />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoFormList from './demo/FormList.vue'
</script>
