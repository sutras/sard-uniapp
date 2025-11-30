<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="TabbarPit 标签栏占位">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="底部安全距离">
      <DemoSafeAreaInsetBottom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoSafeAreaInsetBottom from './demo/SafeAreaInsetBottom.vue'

const { isLocked } = useCurrentPageLock()
</script>
