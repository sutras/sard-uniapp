<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader-input
        ref="cascaderInputRef"
        v-model="value"
        title="请选择省市区"
        placeholder="请选择省市区"
        clearable
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        lazy
        :immediate-load="false"
        :load="loadNode"
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item title="当前值：">
      <template #value>
        <view class="line-clamp-3">
          {{ JSON.stringify(value) ?? 'undefined' }}
        </view>
      </template>
    </sar-list-item>
    <sar-list-item title="手动加载数据" arrow hover @click="handleRefresh" />
    <sar-list-item
      title="设置为：440100 (广东省/广州市)"
      arrow
      hover
      @click="value = 440100"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import {
  type CascaderValue,
  type CascaderOption,
  type CascaderStateNode,
} from 'sard-uniapp'
import { ref } from 'vue'

const cascaderInputRef = ref<{ refresh: () => void }>()

const value = ref<CascaderValue | undefined>()

const handleRefresh = () => {
  cascaderInputRef.value?.refresh()
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
