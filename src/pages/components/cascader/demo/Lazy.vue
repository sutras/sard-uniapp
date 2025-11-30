<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        lazy
        :load="loadNode"
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        @change="onChange"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import { type CascaderOption, type CascaderStateNode } from 'sard-uniapp'

let requestTime = 0

const doGetTreeData = (parentId?: number) => {
  requestTime++

  if (requestTime === 1) throw new Error()

  if (requestTime === 2) return []

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
  return new Promise<ReturnType<typeof doGetTreeData>>((resolve, reject) => {
    setTimeout(() => {
      try {
        const treeData = doGetTreeData(parentId)
        resolve(treeData)
      } catch {
        reject()
      }
    }, 500)
  })
}

const loadNode = async (node?: CascaderStateNode) => {
  return await getTreeData(node?.key as number)
}

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
