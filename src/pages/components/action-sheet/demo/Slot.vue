<template>
  <sar-button @click="onCustomDescription">显示</sar-button>

  <sar-action-sheet-agent id="custom-action-sheet">
    <template #description>
      <view class="flex items-center justify-center">
        <sar-icon name="/static/logo.svg" size="64rpx" />
        <text class="ml-10">描述内容</text>
      </view>
    </template>
    <sar-action-sheet-item label="自定义名称">
      <template #label>
        <text style="color: var(--sar-primary)">自定义名称</text>
      </template>
      <template #description>
        <text style="color: var(--sar-primary)">自定义描述</text>
      </template>
    </sar-action-sheet-item>
    <sar-action-sheet-item label="选项2" color="#ff4d4f" />
    <sar-action-sheet-item label="选项3" description="这是描述" />
    <template #cancel>
      <view class="flex items-center justify-center">
        <text class="mr-10">取消</text>
        <sar-icon label="trash" color="var(--sar-danger)" />
      </view>
    </template>
  </sar-action-sheet-agent>
</template>

<script setup lang="ts">
import { actionSheet, toast } from 'sard-uniapp'

const onCustomDescription = () => {
  actionSheet({
    id: 'custom-action-sheet',
    onSelect(item) {
      toast(item.label)
    },
  })
}
</script>
