<template>
  <view>当前 anchor: {{ current }}</view>
  <sar-button root-style="margin: 10rpx 0" @click="current = 2">
    设置当前 anchor 为: 2
  </sar-button>
  <sar-scroll-spy
    ref="scrollSpyRef"
    v-model:current="current"
    root-style="height: 400rpx; border: 1px solid var(--sar-border-color)"
    @scrolltolower="onScrolltolower"
  >
    <template v-for="item in list" :key="item.name">
      <sar-scroll-spy-anchor :name="item.name" />
      <view class="title">{{ item.title }}</view>
      <view style="padding: 20rpx">
        <view class="content">{{ item.content }}</view>
      </view>
    </template>

    <sar-load-more :status="loadMoreStatus" @load-more="onLoadMore" />
  </sar-scroll-spy>
</template>

<script setup lang="ts">
import { type ScrollSpyExpose, sleep, type LoadMoreStatus } from 'sard-uniapp'
import { nextTick, ref } from 'vue'

let id = 0

const list = ref(
  Array(4)
    .fill(0)
    .map(() => {
      id++
      return {
        title: 'title' + id,
        content: 'content' + id,
        name: id,
      }
    }),
)

const current = ref(1)

const scrollSpyRef = ref<ScrollSpyExpose>()

const loadMoreStatus = ref<LoadMoreStatus>('incomplete')

const loadData = async () => {
  loadMoreStatus.value = 'loading'

  await sleep(300)

  list.value = [
    ...list.value,
    ...Array(2)
      .fill(0)
      .map(() => {
        id++
        return {
          title: 'title' + id,
          content: 'content' + id,
          name: id,
        }
      }),
  ]

  loadMoreStatus.value = list.value.length > 10 ? 'complete' : 'incomplete'

  await nextTick()
  await sleep(50)
  scrollSpyRef.value?.update()
}

const onLoadMore = async () => {
  await loadData()
}

const onScrolltolower = () => {
  if (loadMoreStatus.value === 'incomplete') {
    loadData()
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: sticky;
  top: 0;
  padding: 10rpx;
  background-color: var(--sar-emphasis-bg);
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  background-color: var(--sar-tertiary-bg);
}
</style>
