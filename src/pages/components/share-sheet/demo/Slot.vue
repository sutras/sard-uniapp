<template>
  <sar-list card>
    <sar-list-item hover arrow title="自定义标题" @click="onCustomTitle" />
    <sar-list-item
      hover
      arrow
      title="自定义描述"
      @click="onCustomDescription"
    />
    <sar-list-item hover arrow title="自定义取消按钮" @click="onCustomCancel" />
    <sar-list-item hover arrow title="完全自定义" @click="onCustomContent" />
  </sar-list>

  <sar-share-sheet-agent id="custom-title">
    <template #title>
      <text style="color: #1890ff; font-size: 32rpx; font-weight: bold">
        自定义标题
      </text>
    </template>
    <sar-share-sheet-item
      name="微信"
      background="#07c160"
      icon="wechat-fill"
      icon-family="sari"
    />
    <sar-share-sheet-item
      name="支付宝"
      background="#1677ff"
      icon="alipay-fill"
      icon-family="sari"
    />
    <sar-share-sheet-item
      name="微博"
      background="#ff4d4f"
      icon="weibo-fill"
      icon-family="sari"
    />
  </sar-share-sheet-agent>

  <sar-share-sheet-agent id="custom-description">
    <template #description>
      <text style="color: #999; font-size: 26rpx">
        这是通过插槽自定义的描述
      </text>
    </template>
    <sar-share-sheet-item
      name="微信"
      background="#07c160"
      icon="wechat-fill"
      icon-family="sari"
    />
    <sar-share-sheet-item
      name="支付宝"
      background="#1677ff"
      icon="alipay-fill"
      icon-family="sari"
    />
  </sar-share-sheet-agent>

  <sar-share-sheet-agent id="custom-cancel">
    <sar-share-sheet-item
      name="微信"
      background="#07c160"
      icon="wechat-fill"
      icon-family="sari"
    />
    <sar-share-sheet-item
      name="支付宝"
      background="#1677ff"
      icon="alipay-fill"
      icon-family="sari"
    />
    <template #cancel>
      <text style="color: #666">自定义取消按钮</text>
    </template>
  </sar-share-sheet-agent>

  <sar-share-sheet-agent id="custom-content">
    <template #title>
      <text style="color: #1890ff; font-size: 32rpx; font-weight: bold">
        完全自定义
      </text>
    </template>
    <template #description>
      <text style="color: #999; font-size: 26rpx">所有内容都通过插槽定义</text>
    </template>
    <sar-share-sheet-item
      name="微信"
      background="#07c160"
      icon="wechat-fill"
      icon-family="sari"
    />
    <sar-share-sheet-item
      name="微博"
      background="#ff4d4f"
      icon="weibo-fill"
      icon-family="sari"
    />
    <template #cancel>
      <text style="color: #666">关闭</text>
    </template>
  </sar-share-sheet-agent>
</template>

<script setup lang="ts">
import { shareSheet } from 'sard-uniapp'

const onCustomTitle = () => {
  shareSheet({
    id: 'custom-title',
  })
}

const onCustomDescription = () => {
  shareSheet({
    id: 'custom-description',
  })
}

const onCustomCancel = () => {
  shareSheet({
    id: 'custom-cancel',
  })
}

const onCustomContent = () => {
  shareSheet({
    id: 'custom-content',
  })
}
</script>
