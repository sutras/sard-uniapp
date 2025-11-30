<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="可编辑的">
    <sar-button @click="addRootNode" root-style="margin: 32rpx">
      添加根节点
    </sar-button>
    <sar-button @click="getCleanTreeData" root-style="margin: 32rpx">
      获取树形数据
    </sar-button>
    <sar-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      draggable
      editable
    />
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import { getRegionData } from 'region-data'
import { toast, type TreeExpose } from 'sard-uniapp'
import { ref } from 'vue'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const treeRef = ref<TreeExpose>()

const addRootNode = () => {
  treeRef.value?.addRootNode()
}

const getCleanTreeData = () => {
  toast('打开控制台查看')
  console.log(treeRef.value?.getCleanTreeData())
}

const { isLocked } = useCurrentPageLock()
</script>
