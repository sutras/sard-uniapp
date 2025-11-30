<template>
  <sar-table underline>
    <sar-table-row>
      <sar-table-cell
        v-for="(item, i) in columns"
        :key="item.prop"
        bold
        :width="item.width"
        :fixed="i === 0"
      >
        <view class="py-12 px-16 whitespace-nowrap">{{ item.title }}</view>
      </sar-table-cell>
      <sar-table-cell bold fixed="right" width="120rpx">
        <view class="py-12 px-16 whitespace-nowrap">操作</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in partialData" :key="record.id">
      <sar-table-cell
        v-for="(item, i) in columns"
        :key="item.prop"
        :width="item.width"
        :fixed="i === 0"
      >
        <view class="py-12 px-16 whitespace-nowrap">
          {{ record[item.prop] }}
        </view>
      </sar-table-cell>
      <sar-table-cell fixed="right" width="120rpx">
        <view class="py-12 px-16 whitespace-nowrap">
          <sar-button size="small">编辑</sar-button>
        </view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script setup lang="ts">
import { columns, partialData } from './data'
</script>
