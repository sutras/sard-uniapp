<template>
  <view>
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
        :loading="loading"
        ref="pullDownRefresh"
        :done-duration="500"
        @refresh="onRefresh"
      >
        <template #unready="{ progress }">
          <sar-loading size="48rpx" :animated="false" :progress="progress">
            <template #circular>
              <sar-icon family="demo-icons" name="arrow-clockwise"></sar-icon>
            </template>
            下拉刷新
          </sar-loading>
        </template>
        <template #ready>
          <sar-loading size="48rpx" :animated="false">
            <template #circular>
              <sar-icon family="demo-icons" name="arrow-clockwise"></sar-icon>
            </template>
            释放刷新
          </sar-loading>
        </template>
        <template #loading>
          <sar-loading size="48rpx">
            <template #circular>
              <sar-icon family="demo-icons" name="arrow-clockwise"></sar-icon>
            </template>
            加载中...
          </sar-loading>
        </template>
        <template #done>{{ doneText }}</template>
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
  </view>
</template>

<script setup lang="ts">
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

const doneText = ref('')

const onRefresh = () => {
  loading.value = true
  fetchApi()
    .then(() => {
      doneText.value = '刷新成功'
    })
    .catch(() => {
      doneText.value = '刷新失败'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
