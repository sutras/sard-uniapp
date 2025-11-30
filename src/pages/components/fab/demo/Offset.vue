<template>
  <sar-fab
    :item-list="itemList"
    draggable
    axis="both"
    v-model:offset="offset"
    :navbar-height="navbarHeight"
    @select="onSelect"
  />

  <view class="mt-30 text-center">
    <text>x: {{ offset.x.toFixed(0) }}</text>
    <text class="ml-20">y: {{ offset.y.toFixed(0) }}</text>
  </view>
</template>

<script setup lang="ts">
import { toast, type FabItem } from 'sard-uniapp'
import { ref } from 'vue'

const navbarHeight = uni.upx2px(88)

const itemList = ref<FabItem[]>([
  { name: '首页', iconFamily: 'demo-icons', icon: 'house-door' },
  { name: '分享', iconFamily: 'demo-icons', icon: 'share' },
  { name: '收藏', iconFamily: 'demo-icons', icon: 'star' },
])

const onSelect = (item: FabItem) => {
  toast(`选择了: ${item.name}`)
}

const offset = ref({
  x: 200,
  y: 300,
})
</script>
