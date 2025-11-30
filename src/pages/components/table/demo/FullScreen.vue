<template>
  <sar-status-bar />
  <view class="wrapper">
    <sar-table :height="`calc(100vh - ${statusBarHeight}px)`">
      <sar-table-row fixed>
        <sar-table-cell
          v-for="(item, i) in columns"
          :key="item.prop"
          bold
          width="160rpx"
          :fixed="i === 0"
        >
          <view class="cell cell-title">{{ item.title }}</view>
        </sar-table-cell>
      </sar-table-row>

      <sar-table-row v-for="(record, rowIndex) in data" :key="record.level">
        <sar-table-cell
          v-for="(item, colIndex) in columns"
          :key="item.prop"
          width="160rpx"
          :fixed="colIndex === 0"
          :bold="colIndex === 0"
        >
          <view
            class="cell"
            :style="{ background: getBgColor(rowIndex, colIndex) }"
          >
            {{ record[item.prop] }}
          </view>
        </sar-table-cell>
      </sar-table-row>
    </sar-table>
  </view>
</template>

<script setup lang="ts">
import { columns, data } from './level-data'

const statusBarHeight = uni.getWindowInfo().statusBarHeight

const bgColor = [
  ['rgba(var(--sar-primary-rgb), 0.15)', 'rgba(var(--sar-primary-rgb), 0.05)'],
  ['rgba(var(--sar-primary-rgb), 0.05)', 'rgba(var(--sar-primary-rgb), 0)'],
]

const getBgColor = (row: number, col: number) => {
  return bgColor[row % 2][col % 2]
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 15rpx;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  overflow: hidden;
}
.cell {
  box-sizing: border-box;
  display: flex;
  padding: 12rpx 16rpx;
  height: 108rpx;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  text-align: center;
  font-size: var(--sar-text-sm);
}
.cell-title {
  background-color: var(--sar-primary);
  color: var(--sar-white);
}
</style>
