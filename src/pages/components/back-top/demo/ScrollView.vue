<template>
  <doc-page title="scroll-view 组件滚动">
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      style="height: 60vh"
      @scroll="onScroll"
    >
      <sar-list card root-style="margin: 0 32rpx; padding: 32rpx 0;">
        <sar-list-item v-for="i in 30" :key="i" :title="i" />
      </sar-list>
    </scroll-view>

    <sar-back-top :scroll-top="scrollTop" @click="onClick" />
  </doc-page>
</template>

<script lang="ts" setup>
import { useScrollViewBackTop } from 'sard-uniapp'

const { scrollTop, onScroll, onClick } = useScrollViewBackTop()
</script>
