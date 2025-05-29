<template>
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

<script lang="ts" setup>
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
</script>
