<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="基础用法">
    <sar-tree
      lazy
      :load="loadNode"
      :node-keys="{ title: 'name', key: 'code', isLeaf: 'leaf' }"
      selectable
    />
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import { type TreeStateNode } from 'sard-uniapp'

const doGetTreeData = (parentId?: number) => {
  if (!parentId) {
    return Object.entries(mapProvinces).map(([code, name]) => ({
      code: +code,
      name,
      isLeaf: false,
    }))
  } else {
    const isProvince = /^\d{2}0{4}/.test(String(parentId))
    const isCity = !isProvince && /^\d{4}0{2}/.test(String(parentId))
    const prefixCode = isProvince
      ? String(parentId).slice(0, 2)
      : isCity
        ? String(parentId).slice(0, 4)
        : ''
    const map = isProvince ? mapCities : isCity ? mapCounties : {}
    return Object.entries(map)
      .filter(([code]) => String(code).startsWith(prefixCode))
      .map(([code, name]) => ({
        code: +code,
        name,
        isLeaf: isCity,
      }))
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

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
