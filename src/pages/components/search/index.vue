<template>
  <doc-page title="Search 搜索">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="搜索按钮" full>
      <DemoSearchButton />
    </doc-demo>

    <doc-demo title="取消按钮" full>
      <DemoCancelButton />
    </doc-demo>

    <doc-demo title="形状" full>
      <DemoShape />
    </doc-demo>

    <doc-demo title="对齐" full>
      <DemoAlign />
    </doc-demo>

    <doc-demo title="背景色" full>
      <DemoBackground />
    </doc-demo>

    <doc-demo title="只读和禁用" full>
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="插槽" full>
      <DemoSlot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoSearchButton from './demo/SearchButton.vue'
import DemoCancelButton from './demo/CancelButton.vue'
import DemoShape from './demo/Shape.vue'
import DemoAlign from './demo/Align.vue'
import DemoBackground from './demo/Background.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSlot from './demo/Slot.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
