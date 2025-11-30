<template>
  <sar-table bordered>
    <sar-table-row>
      <sar-table-cell
        v-for="item in partialColumns"
        :key="item.prop"
        bold
        :width="item.width"
      >
        <view class="py-12 px-16">{{ item.title }}</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row v-for="record in partialData" :key="record.id">
      <sar-table-cell
        v-for="item in partialColumns"
        :key="item.prop"
        :width="item.width"
      >
        <view class="py-12 px-16">{{ record[item.prop] }}</view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
