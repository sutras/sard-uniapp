<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="CountDown 倒计时">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="自定义格式">
      <DemoFormat />
    </doc-demo>

    <doc-demo title="毫秒级别的渲染">
      <DemoMillisecond />
    </doc-demo>

    <doc-demo title="自定义样式">
      <DemoStyle />
    </doc-demo>

    <doc-demo title="手动控制">
      <DemoControl />
    </doc-demo>

    <doc-demo title="验证码倒计时">
      <DemoCaptcha />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import DemoBasic from './demo/Basic.vue'
import DemoFormat from './demo/Format.vue'
import DemoMillisecond from './demo/Millisecond.vue'
import DemoStyle from './demo/Style.vue'
import DemoControl from './demo/Control.vue'
import DemoCaptcha from './demo/Captcha.vue'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
