<template>
  <sar-table underline height="400rpx">
    <sar-table-row fixed>
      <sar-table-cell v-for="item in partialColumns" :key="item.prop" bold>
        <view class="cell">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in data" :key="record.id">
      <sar-table-cell v-for="item in partialColumns" :key="item.prop">
        <view class="cell">{{ record[item.prop] }}</view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup>
import { partialColumns, data } from './data'
</script>

<style lang="scss" scoped>
.cell {
  padding: 12rpx 16rpx;
}
</style>
