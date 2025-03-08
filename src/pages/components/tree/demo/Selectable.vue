<template>
  <doc-page title="可选择的">
    <sar-list>
      <sar-list-item
        hover
        arrow
        title="设置选中的节点"
        @click="setCheckedKeys"
      />
      <sar-list-item
        hover
        arrow
        title="获取选中的节点"
        @click="getCheckedKeys"
      />
      <sar-list-item hover arrow title="清空" @click="clear" />
    </sar-list>

    <sar-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      selectable
      default-expand-all
      root-style="margin-top: 30rpx"
    />
  </doc-page>
</template>

<script lang="ts" setup>
import { getRegionData } from 'region-data'
import { toast, type TreeExpose } from 'sard-uniapp'
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

const treeRef = ref<TreeExpose>()

const setCheckedKeys = () => {
  treeRef.value?.setCheckedKeys([110101, 120100])
}
const getCheckedKeys = () => {
  toast(treeRef.value?.getCheckedKeys().join(', '))
}
const clear = () => {
  treeRef.value?.setCheckedKeys([])
}
</script>
