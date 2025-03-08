<template>
  <doc-page emphasis title="Skeleton 骨架屏">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="显示标题">
      <DemoTitle />
    </doc-demo>

    <doc-demo title="显示头像">
      <DemoAvatar />
    </doc-demo>

    <doc-demo title="圆形头像">
      <DemoRoundAvatar />
    </doc-demo>

    <doc-demo title="圆角标题和段落">
      <DemoRoundTitle />
    </doc-demo>

    <doc-demo title="动画效果">
      <DemoAnimated />
    </doc-demo>

    <doc-demo title="包含子组件">
      <DemoContain />
    </doc-demo>

    <doc-demo title="自定义">
      <DemoCustom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoTitle from './demo/Title.vue'
import DemoAvatar from './demo/Avatar.vue'
import DemoRoundAvatar from './demo/RoundAvatar.vue'
import DemoRoundTitle from './demo/RoundTitle.vue'
import DemoAnimated from './demo/Animated.vue'
import DemoContain from './demo/Contain.vue'
import DemoCustom from './demo/Custom.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
