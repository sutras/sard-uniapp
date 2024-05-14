<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
    cancel="取消"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { toast, type ShareSheetItem } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: 'wechat-fill',
    iconFamily: 'demo-icons',
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: 'alipay-fill',
    iconFamily: 'demo-icons',
  },
  {
    name: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    icon: 'twitter-fill',
    iconFamily: 'demo-icons',
  },
  {
    name: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    icon: 'facebook-circle-fill',
    iconFamily: 'demo-icons',
  },
]

const visible = ref(false)

const onSelect = (item: ShareSheetItem) => {
  toast(item.name)
}
</script>
