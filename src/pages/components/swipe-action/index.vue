<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="SwipeAction 滑动操作">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="控制显隐">
      <DemoVisible />
    </doc-demo>

    <doc-demo title="禁止滑动">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="异步关闭">
      <DemoAsync />
    </doc-demo>

    <doc-demo title="结合表单使用">
      <DemoForm />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoVisible from './demo/Visible.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoAsync from './demo/Async.vue'
import DemoForm from './demo/Form.vue'

const { isLocked } = useCurrentPageLock()
</script>
