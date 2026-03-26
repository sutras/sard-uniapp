<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Compact 紧凑布局" emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="块级元素">
      <DemoBlock />
    </doc-demo>

    <doc-demo title="垂直排列">
      <DemoVertical />
    </doc-demo>

    <doc-demo title="垂直排列块级元素">
      <DemoVerticalBlock />
    </doc-demo>

    <doc-demo title="输入类组件">
      <DemoInput />
    </doc-demo>

    <doc-demo title="输入类组件块级元素">
      <DemoInputBlock />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoBlock from './demo/Block.vue'
import DemoVertical from './demo/Vertical.vue'
import DemoVerticalBlock from './demo/VerticalBlock.vue'
import DemoInput from './demo/Input.vue'
import DemoInputBlock from './demo/InputBlock.vue'

const { isLocked } = useCurrentPageLock()
</script>
