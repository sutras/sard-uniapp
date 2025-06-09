<template>
  <doc-page title="Button 按钮">
    <doc-demo title="按钮类型">
      <DemoType />
    </doc-demo>

    <doc-demo title="按钮主题色">
      <DemoTheme />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <DemoColor />
    </doc-demo>

    <doc-demo title="圆形按钮">
      <DemoRound />
    </doc-demo>

    <doc-demo title="圆形按钮">
      <DemoSquare />
    </doc-demo>

    <doc-demo title="禁用按钮">
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="按钮尺寸">
      <DemoSize />
    </doc-demo>

    <doc-demo title="加载中">
      <DemoLoading />
    </doc-demo>

    <doc-demo title="行内块按钮">
      <DemoBlock />
    </doc-demo>

    <doc-demo title="图标按钮">
      <DemoIcon />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoType from './demo/Type.vue'
import DemoTheme from './demo/Theme.vue'
import DemoColor from './demo/Color.vue'
import DemoRound from './demo/Round.vue'
import DemoSquare from './demo/Square.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoSize from './demo/Size.vue'
import DemoLoading from './demo/Loading.vue'
import DemoBlock from './demo/Block.vue'
import DemoIcon from './demo/Icon.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .sar-button {
    margin-bottom: 10px;
  }
}
</style>
