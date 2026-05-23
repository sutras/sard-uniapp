<template>
  <sar-button @click="onClick">显示分享面板</sar-button>
</template>

<script setup lang="ts">
import { shareSheet, toast } from 'sard-uniapp'

const onClick = () => {
  shareSheet({
    title: '分享到',
    showCancel: true,
    itemList: [
      {
        label: 'Wechat',
        color: '#fff',
        background: '#0bc15f',
        icon: 'wechat-fill',
        iconFamily: 'demo-icons',
      },
      {
        label: 'Alipay',
        color: '#fff',
        background: '#1677ff',
        icon: 'alipay-fill',
        iconFamily: 'demo-icons',
      },
    ],
    onSelect(item) {
      toast(item.label)
    },
  })
}
</script>
