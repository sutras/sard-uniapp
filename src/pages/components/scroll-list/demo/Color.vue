<template>
  <sar-scroll-list thumb-bg="var(--sar-danger)">
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
