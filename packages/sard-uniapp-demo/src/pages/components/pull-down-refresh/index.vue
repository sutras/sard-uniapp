<template>
  <doc-page emphasis>
    <doc-demo title="基于页面的刷新" full>
      <sar-pull-down-refresh
        :loading="loading"
        ref="pullDownRefresh"
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
          "
        >
          {{ item }}
        </view>

        <doc-demo title="基于 scroll-view 的刷新">
          <DemoScrollView />
        </doc-demo>

        <doc-demo title="自定义插槽">
          <DemoSlot />
        </doc-demo>
      </sar-pull-down-refresh>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoScrollView from './demo/ScrollView.vue'
import DemoSlot from './demo/Slot.vue'

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
</script>
