<template>
  <doc-page title="基础用法">
    <sar-tree
      lazy
      :load="loadNode"
      :node-keys="{ title: 'name', key: 'code', isLeaf: 'leaf' }"
      selectable
    />
  </doc-page>
</template>

<script lang="ts" setup>
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import { type TreeStateNode } from 'sard-uniapp'

const doGetTreeData = (parentId?: number) => {
  if (!parentId) {
    return Object.entries(mapProvinces).map(([code, name]) => ({ code, name }))
  } else {
    const prefixCode = String(parentId).replace(/0+$/, '')
    const map =
      prefixCode.length === 2
        ? mapCities
        : prefixCode.length <= 4
          ? mapCounties
          : {}
    return Object.entries(map)
      .filter(([code]) => String(code).startsWith(prefixCode))
      .map(([code, name]) => ({ code, name }))
  }
}

const getTreeData = (parentId?: number) => {
  return new Promise<ReturnType<typeof doGetTreeData>>((resolve) => {
    setTimeout(() => {
      const treeData = doGetTreeData(parentId)
      resolve(treeData)
    }, 500)
  })
}

const loadNode = async (node?: TreeStateNode) => {
  const treeData = await getTreeData(node?.key as number)
  return treeData.map((item) => ({
    ...item,
    leaf: node?.depth === 1,
  }))
}
</script>
