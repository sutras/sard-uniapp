<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="CountTo 数字滚动">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
    <doc-demo title="小数位数">
      <DemoPrecision />
    </doc-demo>
    <doc-demo title="分隔符">
      <DemoSeparator />
    </doc-demo>
    <doc-demo title="持续时间">
      <DemoDuration />
    </doc-demo>
    <doc-demo title="随机数字">
      <DemoRandom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoPrecision from './demo/Precision.vue'
import DemoSeparator from './demo/Separator.vue'
import DemoDuration from './demo/Duration.vue'
import DemoRandom from './demo/Random.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
