<template>
  <doc-page title="Indexes 索引">
    <doc-demo title="基础使用" full>
      <DemoBasic />
    </doc-demo>

    <doc-demo title="全屏" full>
      <sar-list>
        <sar-list-item
          title="选择区号"
          arrow
          hover
          @click="navigateTo('FullPage')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'

const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/indexes/demo/${url}`,
  })
}
</script>
