<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="Stepper 步进器">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="最大最小值">
      <DemoMinMax />
    </doc-demo>

    <doc-demo title="步长">
      <DemoStep />
    </doc-demo>

    <doc-demo title="精度">
      <DemoPrecision />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoMinMax from './demo/MinMax.vue'
import DemoStep from './demo/Step.vue'
import DemoPrecision from './demo/Precision.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoSize from './demo/Size.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>

<style lang="scss" scoped>
:deep() {
  .sar-stepper {
    margin-bottom: 20rpx;
  }
}
</style>
