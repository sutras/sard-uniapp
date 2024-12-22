<template>
  <sar-table bordered>
    <sar-table-row>
      <sar-table-cell
        v-for="item in partialColumns"
        :key="item.prop"
        bold
        :width="item.width"
      >
        <view class="cell">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in partialData" :key="record.id">
      <sar-table-cell
        v-for="item in partialColumns"
        :key="item.prop"
        :width="item.width"
      >
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
