<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
    title="分享到"
    description="这是描述"
    show-cancel
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { toast, type ShareSheetItemProps } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = [
  {
    label: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    iconFamily: 'demo-icons',
    icon: 'wechat-fill',
  },
  {
    label: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    iconFamily: 'demo-icons',
    icon: 'alipay-fill',
    description: '这是描述这是描述',
  },
  {
    label: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    iconFamily: 'demo-icons',
    icon: 'twitter-fill',
  },
  {
    label: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    iconFamily: 'demo-icons',
    icon: 'facebook-circle-fill',
  },
]

const visible = ref(false)

const onSelect = (item: ShareSheetItemProps) => {
  toast(item.label)
}
</script>
