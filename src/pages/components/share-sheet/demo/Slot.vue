<template>
  <sar-button @click="showCustomShareSheet">显示分享面板</sar-button>

  <sar-share-sheet-agent id="custom-share-sheet">
    <template #title>
      <text
        style="color: var(--sar-primary); font-size: 32rpx; font-weight: bold"
      >
        自定义标题
      </text>
    </template>
    <template #description>
      <text style="color: var(--sar-danger); font-size: 26rpx">
        这是通过插槽自定义的描述
      </text>
    </template>
    <sar-share-sheet-row>
      <sar-share-sheet-item
        label="Wechat"
        color="#fff"
        background="#0bc15f"
        icon="wechat-fill"
        icon-family="demo-icons"
      />
      <sar-share-sheet-item
        label="Alipay"
        color="#fff"
        background="#1677ff"
        icon="alipay-fill"
        icon-family="demo-icons"
      />
      <sar-share-sheet-item
        label="Twitter"
        color="#fff"
        background="#1d9bf0"
        icon="twitter-fill"
        icon-family="demo-icons"
      />
    </sar-share-sheet-row>
    <template #cancel>
      <text style="color: var(--sar-danger)">关闭</text>
    </template>
  </sar-share-sheet-agent>
</template>

<script setup lang="ts">
import { shareSheet, toast } from 'sard-uniapp'

const showCustomShareSheet = () => {
  shareSheet({
    id: 'custom-share-sheet',
    onSelect(item) {
      toast(item.label)
    },
  })
}
</script>
