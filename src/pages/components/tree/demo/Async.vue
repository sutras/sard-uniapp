<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="异步编辑与拖拽">
    <sar-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      draggable
      editable
      :before-edit="beforeEdit"
      :before-drop="beforeDrop"
    />
  </doc-page>
</template>

<script setup lang="ts">
import {
  sleep,
  TreeProps,
  useCurrentPageLock,
  usePageTopPopup,
} from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { getRegionData } from 'region-data'
import { toast, type TreeExpose } from 'sard-uniapp'
import { ref } from 'vue'

// page
const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})

// tree
const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  name: `${item.name} (编辑会失败)`,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    name: `${item.name} (拖拽会失败)`,
    children: item.children.slice(0, 3),
  })),
}))

const treeRef = ref<TreeExpose>()

const beforeEdit: TreeProps['beforeEdit'] = async (node, title, type) => {
  console.log(node, title, type)
  // 模拟网络请求
  await sleep(500)

  if (type === 'edit' && /0{4}$/.test(String(node.key))) {
    toast('编辑失败')
    return Promise.reject()
  }
}

const beforeDrop: TreeProps['beforeDrop'] = async (
  draggingNode,
  dropNode,
  type,
) => {
  console.log(draggingNode, dropNode, type)
  // 模拟网络请求
  await sleep(500)

  if (/[^0]0{2}$/.test(String(draggingNode.key))) {
    toast('拖拽失败')
    return Promise.reject()
  }
}
</script>
