<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        ref="cascaderRef"
        v-model="value"
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        lazy
        all-levels
        :immediate-load="false"
        :load="loadNode"
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item title="手动加载数据" arrow hover @click="handleRefresh" />
    <sar-list-item
      title="设置为：[440000, 440100, 440111] (广东省/广州市/白云区)"
      arrow
      hover
      @click="value = [440000, 440100, 440111]"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import { type CascaderOption, type CascaderStateNode } from 'sard-uniapp'

const cascaderRef = ref<{ refresh: () => void }>()

const value = ref<number[] | undefined>()

const handleRefresh = () => {
  cascaderRef.value?.refresh()
}

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
