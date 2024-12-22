<template>
  <sar-table>
    <sar-table-row>
      <sar-table-cell v-for="item in partialColumns" :key="item.prop" bold>
        <view class="cell">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row
      v-for="(record, i) in partialData"
      :key="record.id"
      :root-style="{
        background: i % 2 === 0 ? 'var(--sar-secondary-bg)' : undefined,
        borderRadius: '8rpx',
      }"
    >
      <sar-table-cell v-for="item in partialColumns" :key="item.prop">
        <view class="cell">{{ record[item.prop] }}</view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup>
import { partialColumns, partialData } from './data'
</script>

<style lang="scss" scoped>
.cell {
  padding: 12rpx 16rpx;
}
</style>
