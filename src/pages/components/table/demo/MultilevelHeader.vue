<template>
  <sar-table bordered height="500rpx">
    <sar-table-row fixed>
      <sar-table-cell bold width="80rpx" fixed>
        <view class="cell">ID</view>
      </sar-table-cell>
      <sar-table-cell bold width="200rpx">
        <view class="cell">日期</view>
      </sar-table-cell>
      <sar-table-cell width="700rpx">
        <sar-table-row>
          <sar-table-cell bold>
            <view class="cell">收货地址</view>
          </sar-table-cell>
        </sar-table-row>
        <sar-table-row>
          <sar-table-cell bold width="100rpx">
            <view class="cell">姓名</view>
          </sar-table-cell>
          <sar-table-cell width="600rpx">
            <sar-table-row>
              <sar-table-cell bold>
                <view class="cell">地址信息</view>
              </sar-table-cell>
            </sar-table-row>
            <sar-table-row>
              <sar-table-cell bold width="100rpx">
                <view class="cell">城市</view>
              </sar-table-cell>
              <sar-table-cell bold width="200rpx">
                <view class="cell">电话</view>
              </sar-table-cell>
              <sar-table-cell bold width="300rpx">
                <view class="cell">地址</view>
              </sar-table-cell>
            </sar-table-row>
          </sar-table-cell>
        </sar-table-row>
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
