<template>
  <sar-table underline height="400rpx">
    <sar-table-row fixed>
      <sar-table-cell v-for="item in partialColumns" :key="item.prop" bold>
        <view class="py-12 px-16">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in data" :key="record.id">
      <sar-table-cell v-for="item in partialColumns" :key="item.prop">
        <view class="py-12 px-16">{{ record[item.prop] }}</view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup>
import { partialColumns, data } from './data'
</script>
