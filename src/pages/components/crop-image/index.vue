<template>
  <doc-page title="CropImage 裁剪图片">
    <sar-crop-image-agent />

    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="裁剪比例">
      <DemoCropScale />
    </doc-demo>

    <doc-demo title="修改裁剪尺寸">
      <DemoBeforeCrop />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoCropScale from './demo/CropScale.vue'
import DemoBeforeCrop from './demo/BeforeCrop.vue'
</script>
