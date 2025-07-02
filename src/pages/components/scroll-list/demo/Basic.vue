<template>
  <sar-scroll-list>
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
import { ref } from 'vue'

const rows = ref(
  Array(16)
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
    ),
)
</script>
