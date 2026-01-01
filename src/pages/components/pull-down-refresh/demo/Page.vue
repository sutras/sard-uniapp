<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="基于页面的刷新">
    <sar-pull-down-refresh
      ref="pullDownRefresh"
      :loading="loading"
      root-style="min-height: 100vh"
      @refresh="onRefresh"
    >
      <view
        v-for="item in 5"
        :key="item"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 32rpx 10rpx;
          height: 40px;
          border: 1px solid var(--sar-border-color);
          border-radius: var(--sar-rounded);
        "
      >
        {{ item }}
      </view>
    </sar-pull-down-refresh>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { toast } from 'sard-uniapp'
import { ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

const loading = ref(false)
const pullDownRefresh = ref()

onPageScroll(({ scrollTop }) => {
  pullDownRefresh.value?.enableToRefresh(scrollTop === 0)
})

const fetchApi = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const onRefresh = () => {
  loading.value = true
  fetchApi()
    .then(() => {
      toast('刷新成功')
    })
    .catch(() => {
      toast('刷新失败')
    })
    .finally(() => {
      loading.value = false
    })
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
