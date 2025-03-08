<template>
  <doc-page title="严格的树节点过滤">
    <view style="padding: 32rpx; background: var(--sar-emphasis-bg)">
      <sar-input v-model="searchString" placeholder="请输入过滤关键词" />
    </view>

    <sar-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      filter-mode="strict"
    />
  </doc-page>
</template>

<script lang="ts" setup>
import { type TreeExpose } from 'sard-uniapp'
import { ref, watch } from 'vue'
import { getRegionData } from 'region-data'

const searchString = ref('')

const treeRef = ref<TreeExpose>()

watch(searchString, () => {
  treeRef.value?.filter(searchString.value)
})

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))
</script>
