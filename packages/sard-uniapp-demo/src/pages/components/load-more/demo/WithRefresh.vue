<template>
  <view>
    <scroll-view
      scroll-y
      style="
        height: 300px;
        margin: 20rpx 0;
        border: 1px solid var(--sar-border-color);
      "
      @scroll="onScroll"
      @scrolltolower="onScrolltolower"
    >
      <sar-pull-down-refresh
        :loading="refreshing"
        ref="pullDownRefresh"
        @refresh="onRefresh"
        :disabled="loadMoreStatus === 'loading'"
      >
        <view
          v-for="item in list"
          :key="item"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10rpx 32rpx;
            height: 40px;
            border: 1px solid var(--sar-border-color);
          "
        >
          {{ item }}
        </view>

        <sar-load-more
          :status="loadMoreStatus"
          @load-more="onLoadMore"
          @reload="onReload"
        ></sar-load-more>
      </sar-pull-down-refresh>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { type LoadMoreStatus, toast } from 'sard-uniapp'
import { onMounted, ref } from 'vue'

const currentPage = ref(1)
const list = ref<number[]>([])

const fetchApi = (page: number) => {
  return new Promise<{ page: number; total: number; list: number[] }>(
    (resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.55) {
          resolve({
            page,
            total: 3,
            list:
              page > 3
                ? []
                : Array(4)
                    .fill(0)
                    .map((_, i) => i + 1 + (page - 1) * 4),
          })
        } else {
          reject()
        }
      }, 1000)
    },
  )
}

// 下拉刷新
const refreshing = ref(false)
const pullDownRefresh = ref()

const onScroll = (event: any) => {
  pullDownRefresh.value?.setScrollTop(event.detail.scrollTop)
}

const onRefresh = () => {
  refreshing.value = true
  fetchApi(1)
    .then((res) => {
      currentPage.value = 1
      list.value = res.list
      loadMoreStatus.value = res.page < res.total ? 'incomplete' : 'complete'
      toast('刷新成功')
    })
    .catch(() => {
      toast('刷新失败')
    })
    .finally(() => {
      refreshing.value = false
    })
}

// 加载更多
const loadMoreStatus = ref<LoadMoreStatus>('incomplete')

const loadMoreFetch = (page: number) => {
  loadMoreStatus.value = 'loading'
  fetchApi(page)
    .then((res) => {
      list.value = [...list.value, ...res.list]
      loadMoreStatus.value = res.page < res.total ? 'incomplete' : 'complete'
    })
    .catch(() => {
      loadMoreStatus.value = 'error'
    })
}

const onLoadMore = () => {
  if (!refreshing.value) {
    loadMoreFetch(++currentPage.value)
  }
}

const onReload = () => {
  if (!refreshing.value) {
    loadMoreFetch(currentPage.value)
  }
}

const onScrolltolower = () => {
  if (!refreshing.value && loadMoreStatus.value === 'incomplete') {
    loadMoreFetch(++currentPage.value)
  }
}

onMounted(() => {
  loadMoreFetch(currentPage.value)
})
</script>
