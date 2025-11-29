<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader-input
        v-model="value"
        title="请选择省市区"
        placeholder="请选择省市区"
        clearable
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        lazy
        :load="loadNode"
        multiple
        all-levels
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
    <sar-list-item
      title="设置为：[[440000, 440100, 440106], [440000, 440100, 440111]] ([天河区, 白云区])"
      arrow
      hover
      @click="
        value = [
          [440000, 440100, 440106],
          [440000, 440100, 440111],
        ]
      "
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script lang="ts" setup>
import { mapProvinces, mapCities, mapCounties } from 'region-data'
import {
  type CascaderValue,
  type CascaderOption,
  type CascaderStateNode,
} from 'sard-uniapp'
import { ref } from 'vue'

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
const value = ref<CascaderValue | undefined>([
  [440000, 440100, 440106],
  [440000, 440100, 440111],
])

const loadNode = async (node?: CascaderStateNode) => {
  return await getTreeData(node?.key as number)
}

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
