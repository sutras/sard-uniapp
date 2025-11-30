<template>
  <sar-fab :item-list="itemList" top="80px" right="48rpx" />
</template>

<script setup lang="ts">
import { type FabItem } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = ref<FabItem[]>([
  { name: '首页', iconFamily: 'demo-icons', icon: 'house-door' },
  { name: '分享', iconFamily: 'demo-icons', icon: 'share' },
  { name: '收藏', iconFamily: 'demo-icons', icon: 'star' },
])
</script>
