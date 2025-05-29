<template>
  <doc-page title="单一选择">
    <sar-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      v-model:current="value"
      single-selectable
      default-expand-all
      root-style="margin-top: 30rpx"
      @select="onSelect"
    />
  </doc-page>
</template>

<script lang="ts" setup>
import { getRegionData } from 'region-data'
import { type TreeStateNode } from 'sard-uniapp'
import { ref } from 'vue'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item, index) => ({
  ...item,
  disabled: index === 0 ? true : false,
  children: item.children.slice(0, 3).map((item, index) => ({
    ...item,
    disabled: index === 0 ? true : false,
    children: item.children.slice(0, 3),
  })),
}))

const value = ref(110102)

const onSelect = (key: number | string, node: TreeStateNode) => {
  console.log(key, node)
}
</script>
