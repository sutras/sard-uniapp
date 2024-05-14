<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
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
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoMultipleRow from './demo/MultipleRow.vue'
import DemoTitleDescription from './demo/TitleDescription.vue'
import DemoPicture from './demo/Picture.vue'
import DemoDisabled from './demo/Disabled.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
