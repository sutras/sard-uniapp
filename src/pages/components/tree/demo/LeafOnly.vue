<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="仅选择叶子节点">
    <sar-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      single-selectable
      leaf-only
      default-expand-all
      root-style="margin-top: 30rpx"
      @select="onSelect"
    />
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { getRegionData } from 'region-data'
import { type TreeStateNode } from 'sard-uniapp'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const onSelect = (key: number | string, node: TreeStateNode) => {
  console.log(key, node)
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
