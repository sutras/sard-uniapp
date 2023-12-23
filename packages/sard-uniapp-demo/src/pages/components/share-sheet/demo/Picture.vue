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
    name: 'Sard',
    icon: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    iconFamily: 'demo-icons',
    icon: 'wechat-fill',
  },
]

const visible = ref(false)

const onSelect = (item: ShareSheetItem) => {
  toast(item.name as string)
}
</script>
