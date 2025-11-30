<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="手风琴">
    <sar-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      accordion
    />
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const { isLocked } = useCurrentPageLock()
</script>
