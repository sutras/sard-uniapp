<template>
  <doc-page emphasis title="Upload 上传">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="上传视频">
      <DemoVideo />
    </doc-demo>

    <doc-demo title="同时上传图片和视频">
      <DemoMix />
    </doc-demo>

    <doc-demo title="限定上传数量">
      <DemoMaxCount />
    </doc-demo>

    <doc-demo title="多选">
      <DemoMultiple />
    </doc-demo>

    <doc-demo title="选择文件前置处理">
      <DemoBeforeChoose />
    </doc-demo>

    <doc-demo title="上传前置处理">
      <DemoBeforeRead />
    </doc-demo>

    <doc-demo title="限定上传大小">
      <DemoSize />
    </doc-demo>

    <doc-demo title="上传状态">
      <DemoStatus />
    </doc-demo>

    <doc-demo title="重传与取消">
      <DemoReuploadCancel />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="自定义选区样式">
      <DemoCustomSelect />
    </doc-demo>

    <doc-demo title="自定义渲染">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoVideo from './demo/Video.vue'
import DemoMix from './demo/Mix.vue'
import DemoMaxCount from './demo/MaxCount.vue'
import DemoMultiple from './demo/Multiple.vue'
import DemoBeforeChoose from './demo/BeforeChoose.vue'
import DemoBeforeRead from './demo/BeforeRead.vue'
import DemoSize from './demo/Size.vue'
import DemoStatus from './demo/Status.vue'
import DemoReuploadCancel from './demo/ReuploadCancel.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoCustomSelect from './demo/CustomSelect.vue'
import DemoCustom from './demo/Custom.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-upload {
    margin-bottom: 20rpx;
  }
}
</style>
