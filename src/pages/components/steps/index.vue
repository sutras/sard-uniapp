<template>
  <doc-page title="Steps 步骤条">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="居中">
      <DemoCenter />
    </doc-demo>

    <doc-demo title="垂直步骤条">
      <DemoVertical />
    </doc-demo>

    <doc-demo title="垂直居中">
      <DemoVerticalCenter />
    </doc-demo>

    <doc-demo title="自定义图标">
      <DemoIcon />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="当前步骤状态">
      <DemoStatus />
    </doc-demo>

    <doc-demo title="错误步骤">
      <DemoErrorStatus />
    </doc-demo>

    <doc-demo title="自定义各步骤状态">
      <DemoStepStatus />
    </doc-demo>

    <doc-demo title="默认插槽">
      <DemoSlot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoCenter from './demo/Center.vue'
import DemoVertical from './demo/Vertical.vue'
import DemoVerticalCenter from './demo/VerticalCenter.vue'
import DemoIcon from './demo/Icon.vue'
import DemoColor from './demo/Color.vue'
import DemoStatus from './demo/Status.vue'
import DemoErrorStatus from './demo/ErrorStatus.vue'
import DemoStepStatus from './demo/StepStatus.vue'
import DemoSlot from './demo/Slot.vue'
</script>
