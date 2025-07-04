<template>
  <doc-page title="List 列表">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="可链接的" full>
      <DemoLinkable />
    </doc-demo>

    <doc-demo title="图标" full>
      <DemoIcon />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <DemoSlot />
    </doc-demo>

    <doc-demo title="列表标题和描述" full>
      <DemoGroup />
    </doc-demo>

    <doc-demo title="卡片风格">
      <DemoCard />
    </doc-demo>

    <doc-demo title="隐藏边框">
      <DemoHideBorder />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoLinkable from './demo/Linkable.vue'
import DemoIcon from './demo/Icon.vue'
import DemoSlot from './demo/Slot.vue'
import DemoGroup from './demo/Group.vue'
import DemoCard from './demo/Card.vue'
import DemoHideBorder from './demo/HideBorder.vue'
</script>
