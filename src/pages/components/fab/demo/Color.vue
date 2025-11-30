<template>
  <sar-fab
    :item-list="itemList"
    background="linear-gradient(300deg, rgb(245, 52, 35) 0%, rgb(246, 127, 72) 100%)"
  />
</template>

<script setup lang="ts">
import { type FabItem } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = ref<FabItem[]>([
  {
    name: '首页',
    iconFamily: 'demo-icons',
    icon: 'house-door',
    background: 'rgb(59, 190, 136)',
  },
  {
    name: '分享',
    iconFamily: 'demo-icons',
    icon: 'share',
    background: 'rgb(247, 149, 59)',
  },
  {
    name: '收藏',
    iconFamily: 'demo-icons',
    icon: 'star',
    background: 'rgb(52, 147, 240)',
  },
])
</script>
