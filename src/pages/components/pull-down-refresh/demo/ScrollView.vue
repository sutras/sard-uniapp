<template>
  <doc-page emphasis title="基于 scroll-view 的刷新" padding="20rpx">
    <sar-button @click="loading = !loading">toggle loading</sar-button>
    <scroll-view
      scroll-y
      style="
        height: 300px;
        margin: 20rpx 0;
        border: 1px solid var(--sar-border-color);
      "
      :throttle="false"
      @scroll="onScroll"
      @scrolltoupper="onScrolltoupper"
    >
      <sar-pull-down-refresh
        ref="pullDownRefresh"
        :loading="loading"
        @refresh="onRefresh"
      >
        <view
          v-for="item in 10"
          :key="item"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10rpx 32rpx;
            height: 40px;
            border: 1px solid var(--sar-border-color);
            border-radius: var(--sar-rounded);
          "
        >
          {{ item }}
        </view>
      </sar-pull-down-refresh>
    </scroll-view>
  </doc-page>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const loading = ref(false)
const pullDownRefresh = ref()

const onScroll = (event: any) => {
  pullDownRefresh.value?.enableToRefresh(event.detail.scrollTop === 0)
}
const onScrolltoupper = () => {
  pullDownRefresh.value?.enableToRefresh(true)
}

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
</script>
