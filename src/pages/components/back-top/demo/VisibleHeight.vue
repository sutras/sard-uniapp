<template>
  <doc-page title="可见时的高度">
    <sar-list card root-style="margin: 0 32rpx; padding: 32rpx 0;">
      <sar-list-item v-for="i in 30" :key="i" :title="i" />
    </sar-list>

    <sar-back-top
      :scroll-top="scrollTop"
      :visible-height="0"
      @click="onClick"
    />
  </doc-page>
</template>

<script lang="ts" setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { usePageBackTop } from 'sard-uniapp'

const { scrollTop, onClick } = usePageBackTop()
onPageScroll(() => void 0)
</script>
