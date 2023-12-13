<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        :options="regionData"
        :field-names="{ label: 'name', value: 'code' }"
        @update:model-value="onChange"
      >
        <template #top="{ tabIndex }">
          <view
            :style="{
              padding: '16rpx 32rpx',
              backgroundColor: 'rgba(var(--sar-primary-rgb), 0.1)',
              color: 'var(--sar-primary)',
            }"
          >
            当前为第{{ tabIndex + 1 }}级
          </view>
        </template>
      </sar-cascader>
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { getRegionData, type Node } from 'region-data'
import { toast } from '@sard/uniapp'

const regionData = getRegionData()

const onChange = (_: any, selectedOptions: Node[]) => {
  toast(selectedOptions.map((option) => option.name).join('/'))
}
</script>
