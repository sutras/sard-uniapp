<template>
  <sar-skeleton-block v-if="loading" height="252rpx" animated />
  <sar-scroll-list v-if="!loading">
    <view class="list">
      <view v-for="(row, i) in rows" :key="i" class="list-row">
        <view v-for="(item, j) in row" :key="j" class="list-item">
          <sar-icon :name="item.icon" size="48rpx" />
          <view class="list-text">{{ item.text }}</view>
        </view>
      </view>
    </view>
  </sar-scroll-list>
</template>

<script setup lang="ts">
import { sleep } from 'sard-uniapp'
import { onMounted, ref } from 'vue'

const loading = ref(false)
const rows = ref<any[]>([])

const getData = async () => {
  await sleep(1000)
  return Array(16)
    .fill(0)
    .reduce(
      (rows, _, i) => {
        rows[i % 2].push({
          text: '文字' + (i + 1),
          icon: 'image',
        })
        return rows
      },
      [[], []],
    )
}

onMounted(async () => {
  loading.value = true
  rows.value = await getData()
  loading.value = false
})
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.list-row {
  display: flex;
  flex-direction: row;
  gap: 32rpx;
}
.list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120rpx;
  flex: none;
}
.list-text {
  margin-top: 10rpx;
  font-size: var(--sar-text-sm);
  color: var(--sar-secondary-color);
}
</style>
