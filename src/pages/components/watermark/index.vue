<template>
  <doc-page title="Watermark 水印" emphasis>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="多行水印">
      <DemoMultiLine />
    </doc-demo>

    <doc-demo title="图片水印">
      <DemoImage />
    </doc-demo>

    <doc-demo title="自定义绘制">
      <sar-list>
        <sar-list-item
          title="自定义绘制"
          arrow
          hover
          @click="navigateTo('Custom')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoMultiLine from './demo/MultiLine.vue'
import DemoImage from './demo/Image.vue'

const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/watermark/demo/${url}`,
  })
}
</script>
