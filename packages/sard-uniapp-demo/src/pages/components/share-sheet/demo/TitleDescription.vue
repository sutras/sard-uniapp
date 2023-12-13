<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
    title="分享到"
    description="这是描述"
    cancel="取消"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { toast, type ShareSheetItem } from '@sard/uniapp'
import { ref } from 'vue'

const itemList = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    iconFamily: 'demo-icons',
    icon: 'wechat-fill',
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    iconFamily: 'demo-icons',
    icon: 'alipay-fill',
    description: '这是描述这是描述',
  },
  {
    name: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    iconFamily: 'demo-icons',
    icon: 'twitter-fill',
  },
  {
    name: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    iconFamily: 'demo-icons',
    icon: 'facebook-circle-fill',
  },
]

const visible = ref(false)

const onSelect = (item: ShareSheetItem) => {
  toast(item.name as string)
}
</script>
