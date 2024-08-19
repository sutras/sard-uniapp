<template>
  <doc-page>
    <sar-tree :data="treeData" :node-keys="{ title: 'name', key: 'code' }" />
  </doc-page>
</template>

<script lang="ts" setup>
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))
</script>
