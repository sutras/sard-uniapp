<template>
  <doc-page emphasis>
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="强制滚动" full>
      <DemoScrollable />
    </doc-demo>

    <doc-demo title="强制不滚动" full>
      <DemoUnScrollable />
    </doc-demo>

    <doc-demo title="多行展示" full>
      <DemoWrap />
    </doc-demo>

    <doc-demo title="自定义左边图标" full>
      <DemoLeftIcon />
    </doc-demo>

    <doc-demo title="可关闭的" full>
      <DemoClosable />
    </doc-demo>

    <doc-demo title="可链接的" full>
      <DemoLinkable />
    </doc-demo>

    <doc-demo title="自定义右边图标" full>
      <DemoRightIcon />
    </doc-demo>

    <doc-demo title="自定义样式" full>
      <DemoStyle />
    </doc-demo>

    <doc-demo title="垂直滚动" full>
      <DemoVertical />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoScrollable from './demo/Scrollable.vue'
import DemoUnScrollable from './demo/UnScrollable.vue'
import DemoWrap from './demo/Wrap.vue'
import DemoLeftIcon from './demo/LeftIcon.vue'
import DemoClosable from './demo/Closable.vue'
import DemoLinkable from './demo/Linkable.vue'
import DemoRightIcon from './demo/RightIcon.vue'
import DemoStyle from './demo/Style.vue'
import DemoVertical from './demo/Vertical.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-notice-bar {
    margin-bottom: 20rpx;
  }
}
</style>
