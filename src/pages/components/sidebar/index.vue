<template>
  <doc-page emphasis title="Sidebar 侧边导航">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="圆角" full>
      <DemoRound />
    </doc-demo>

    <doc-demo title="线条" full>
      <DemoLine />
    </doc-demo>

    <doc-demo title="禁用" full>
      <DemoDisabled />
    </doc-demo>

    <doc-demo title="自定义" full>
      <DemoCustom />
    </doc-demo>

    <doc-demo title="场景应用" full>
      <sar-list>
        <sar-list-item
          title="场景1"
          arrow
          hover
          @click="navigateTo('Scene1')"
        />
        <sar-list-item
          title="场景2"
          arrow
          hover
          @click="navigateTo('Scene2')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoRound from './demo/Round.vue'
import DemoLine from './demo/Line.vue'
import DemoDisabled from './demo/Disabled.vue'
import DemoCustom from './demo/Custom.vue'

const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/sidebar/demo/${url}`,
  })
}
</script>
