<template>
  <sar-table underline>
    <sar-table-row>
      <sar-table-cell v-for="item in partialColumns" :key="item.prop" bold>
        <view class="py-12 px-16">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in partialData" :key="record.id">
      <sar-table-cell v-for="item in partialColumns" :key="item.prop">
        <view class="py-12 px-16">{{ record[item.prop] }}</view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup>
import { partialColumns, partialData } from './data'
</script>
