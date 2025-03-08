<template>
  <doc-page title="滚动时长">
    <sar-list card root-style="margin: 0 32rpx; padding: 32rpx 0;">
      <sar-list-item v-for="i in 30" :key="i" :title="i" />
    </sar-list>

    <sar-back-top :scroll-top="scrollTop" @click="onClick" />
  </doc-page>
</template>

<script lang="ts" setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { usePageBackTop } from 'sard-uniapp'

const { scrollTop, onClick } = usePageBackTop(0)
onPageScroll(() => void 0)
</script>
