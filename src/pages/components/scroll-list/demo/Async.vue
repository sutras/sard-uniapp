<template>
  <sar-skeleton-block v-if="loading" height="252rpx" animated />
  <sar-scroll-list v-if="!loading">
    <view class="flex flex-col gap-20">
      <view v-for="(row, i) in rows" :key="i" class="flex gap-32">
        <view
          v-for="(item, j) in row"
          :key="j"
          class="flex flex-col justify-center items-center w-120 flex-none"
        >
          <sar-icon :name="item.icon" size="48rpx" />
          <view class="mt-10 text-sm stext-secondary">{{ item.text }}</view>
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
