<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="滚动时长">
    <sar-list card root-style="margin: 0 32rpx; padding: 32rpx 0;">
      <sar-list-item v-for="i in 30" :key="i" :title="i" />
    </sar-list>

    <sar-back-top :scroll-top="scrollTop" @click="onClick" />
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { onPageScroll } from '@dcloudio/uni-app'
import { usePageBackTop } from 'sard-uniapp'

const { scrollTop, onClick } = usePageBackTop(0)
onPageScroll(() => void 0)

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
