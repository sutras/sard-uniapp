<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Cascader 级联选择">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="选择即改变">
      <DemoChangeOnSelect />
    </doc-demo>

    <doc-demo title="异步加载">
      <DemoAsync />
    </doc-demo>

    <doc-demo title="懒加载">
      <DemoLazy />
    </doc-demo>

    <doc-demo title="自定义面板上方内容">
      <DemoOptionTop />
    </doc-demo>

    <doc-demo title="禁选选项">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="绑定所有级别的值">
      <DemoAllLevels />
    </doc-demo>

    <doc-demo title="多选">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="多选-绑定所有级别的值">
      <DemoMultipleAllLevels />
    </doc-demo>

    <doc-demo title="多选-选择任意级别">
      <DemoCheckStrictly />
    </doc-demo>

    <doc-demo title="多选-选择任意级别-绑定所有级别">
      <DemoCheckStrictlyAllLevels />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import DemoBasic from './demo/Basic.vue'
import DemoChangeOnSelect from './demo/ChangeOnSelect.vue'
import DemoAsync from './demo/Async.vue'
import DemoLazy from './demo/Lazy.vue'
import DemoOptionTop from './demo/OptionTop.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoAllLevels from './demo/AllLevels.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoMultipleAllLevels from './demo/MultipleAllLevels.vue'
import DemoCheckStrictly from './demo/CheckStrictly.vue'
import DemoCheckStrictlyAllLevels from './demo/CheckStrictlyAllLevels.vue'

const { isLocked } = useCurrentPageLock()
</script>

<style lang="scss" scoped>
:deep() {
  .sar-button {
    margin-top: 20rpx;
  }
}
</style>
