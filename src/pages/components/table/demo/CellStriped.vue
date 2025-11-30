<template>
  <sar-table>
    <sar-table-row>
      <sar-table-cell v-for="item in partialColumns" :key="item.prop" bold>
        <view class="cell">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="(record, i) in partialData" :key="record.id">
      <sar-table-cell v-for="item in partialColumns" :key="item.prop">
        <view :class="['cell', { striated: i % 2 === 0 }]">
          {{ record[item.prop] }}
        </view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>

<style lang="scss" scoped>
.cell {
  flex: 1;
  padding: 12rpx 16rpx;
  margin: 0 8rpx;
  text-align: center;
  border-radius: 8rpx;
}
.striated {
  background-color: var(--sar-secondary-bg);
}
</style>
