<template>
  <sar-fab :item-list="itemList" @select="onSelect" />
</template>

<script setup lang="ts">
import { toast, type FabItem } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = ref<FabItem[]>([
  { name: '首页', iconFamily: 'demo-icons', icon: 'house-door' },
  { name: '分享', iconFamily: 'demo-icons', icon: 'share' },
  { name: '收藏', iconFamily: 'demo-icons', icon: 'star' },
])

const onSelect = (item: FabItem) => {
  toast(`选择了: ${item.name}`)
}
</script>
