<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="自定义锚点">
    <sar-floating-panel v-model:height="height" :anchors="anchors">
      <view style="padding: 20rpx; text-align: center">
        {{ height.toFixed(0) }}
      </view>
      <sar-list>
        <sar-list-item
          v-for="i in 26"
          :key="i"
          :title="String.fromCharCode(i + 64)"
        ></sar-list-item>
      </sar-list>
    </sar-floating-panel>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { getWindowInfo } from 'sard-uniapp'
import { ref } from 'vue'

const { windowHeight } = getWindowInfo()

const anchors = [
  100,
  Math.round(0.4 * windowHeight),
  Math.round(0.7 * windowHeight),
]

const height = ref(anchors[0])
const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
