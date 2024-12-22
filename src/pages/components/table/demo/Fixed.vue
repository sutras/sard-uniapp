<template>
  <sar-table underline height="400rpx">
    <sar-table-row fixed>
      <sar-table-cell
        v-for="(item, i) in columns"
        :key="item.prop"
        bold
        :width="item.width"
        :fixed="i === 0"
      >
        <view class="cell">{{ item.title }}</view>
      </sar-table-cell>
      <sar-table-cell bold fixed="right" width="120rpx">
        <view class="cell">操作</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in data" :key="record.id">
      <sar-table-cell
        v-for="(item, i) in columns"
        :key="item.prop"
        :width="item.width"
        :fixed="i === 0"
      >
        <view class="cell">{{ record[item.prop] }}</view>
      </sar-table-cell>
      <sar-table-cell fixed="right" width="120rpx">
        <view class="cell">
          <sar-button size="small">编辑</sar-button>
        </view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup>
import { columns, data } from './data'
</script>

<style lang="scss" scoped>
.cell {
  padding: 12rpx 16rpx;
  white-space: nowrap;
}
</style>
