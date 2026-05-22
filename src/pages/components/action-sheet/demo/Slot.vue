<template>
  <sar-list card>
    <sar-list-item
      hover
      arrow
      title="自定义描述"
      @click="onCustomDescription"
    />
    <sar-list-item hover arrow title="自定义取消按钮" @click="onCustomCancel" />
    <sar-list-item hover arrow title="自定义内容" @click="onCustomContent" />
  </sar-list>

  <sar-action-sheet-agent id="custom-description">
    <template #description>
      <text style="color: #999; font-size: 28rpx">
        这是通过插槽自定义的描述内容
      </text>
    </template>
    <sar-action-sheet-item name="选项1" />
    <sar-action-sheet-item name="选项2" color="#ff4d4f" />
    <sar-action-sheet-item name="选项3" description="这是描述" />
  </sar-action-sheet-agent>

  <sar-action-sheet-agent id="custom-cancel">
    <sar-action-sheet-item name="选项1" />
    <sar-action-sheet-item name="选项2" />
    <template #cancel>
      <text style="color: #666">自定义取消按钮</text>
    </template>
  </sar-action-sheet-agent>

  <sar-action-sheet-agent id="custom-content">
    <sar-action-sheet-item name="选项1" />
    <sar-action-sheet-item name="自定义名称">
      <template #name>
        <text style="color: #1890ff">自定义名称</text>
      </template>
    </sar-action-sheet-item>
  </sar-action-sheet-agent>
</template>

<script setup lang="ts">
import { actionSheet } from 'sard-uniapp'

const onCustomDescription = () => {
  actionSheet({
    id: 'custom-description',
  })
}

const onCustomCancel = () => {
  actionSheet({
    id: 'custom-cancel',
  })
}

const onCustomContent = () => {
  actionSheet({
    id: 'custom-content',
  })
}
</script>
