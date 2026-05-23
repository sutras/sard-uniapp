<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
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
    icon: 'wechat-fill',
    iconFamily: 'demo-icons',
    disabled: true,
  },
  {
    label: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: 'alipay-fill',
    iconFamily: 'demo-icons',
  },
]

const visible = ref(false)

const onSelect = (item: ShareSheetItemProps) => {
  toast(item.label)
}
</script>
