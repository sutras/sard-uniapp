<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="结合下拉刷新与触底加载">
    <sar-pull-down-refresh
      ref="pullDownRefresh"
      :loading="refreshing"
      :disabled="loadMoreStatus === 'loading'"
      @refresh="onRefresh"
    >
      <sar-waterfall
        ref="waterfallRef"
        class="mx-16"
        :column-gap="4"
        :row-gap="4"
      >
        <sar-waterfall-item v-for="item in list" :key="item.id">
          <template #default="{ onLoad }">
            <image
              mode="widthFix"
              class="flex w-full"
              :src="item.url"
              @load="onLoad"
              @error="onLoad"
            />
            <sar-button
              class="absolute top-10 right-10"
              size="small"
              theme="danger"
              @click="onDelete(item)"
            >
              删除
            </sar-button>
          </template>
        </sar-waterfall-item>
      </sar-waterfall>

      <sar-load-more
        :status="loadMoreStatus"
        @load-more="onLoadMore"
        @reload="onReload"
      />
    </sar-pull-down-refresh>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import {
  shuffle,
  sleep,
  toast,
  WaterfallExpose,
  type LoadMoreStatus,
} from 'sard-uniapp'
import { onMounted, ref } from 'vue'

// api
interface ListItem {
  id: number
  url: string
}

const currentPage = ref(1)
const list = ref<ListItem[]>([])

let uuid = 1

const fetchApi = async (page: number) => {
  await sleep(300)

  const getList = () =>
    Array(12)
      .fill(0)
      .map((_, i) => {
        return {
          id: uuid++,
          url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger${(i % 12) + 1}.jpg`,
        }
      })

  return {
    page,
    total: 3,
    list: page > 3 ? [] : shuffle(getList()),
  }
}

// waterfall
const waterfallRef = ref<WaterfallExpose>()

// 下拉刷新
const refreshing = ref(false)
const pullDownRefresh = ref()

onPageScroll(({ scrollTop }) => {
  pullDownRefresh.value?.enableToRefresh(scrollTop === 0)
})

const onRefresh = () => {
  refreshing.value = true
  fetchApi(1)
    .then((res) => {
      currentPage.value = 1

      list.value = []

      setTimeout(() => {
        list.value = res.list

        loadMoreStatus.value = 'loading'

        waterfallRef.value?.onLoad(() => {
          setTimeout(() => {
            loadMoreStatus.value =
              res.page < res.total ? 'incomplete' : 'complete'
          }, 300)
        })
        toast('刷新成功')
      })
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

      waterfallRef.value?.onLoad(() => {
        setTimeout(() => {
          loadMoreStatus.value =
            res.page < res.total ? 'incomplete' : 'complete'
        }, 300)
      })
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

onReachBottom(() => {
  if (!refreshing.value && loadMoreStatus.value === 'incomplete') {
    loadMoreFetch(++currentPage.value)
  }
})

onMounted(() => {
  loadMoreFetch(currentPage.value)
})

// 删除
const onDelete = (item: ListItem) => {
  list.value.splice(list.value.indexOf(item), 1)
}
const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
