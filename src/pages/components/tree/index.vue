<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Tree 树形">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基础用法"
          arrow
          hover
          @click="navigateTo('Basic')"
        />
        <sar-list-item
          title="手风琴"
          arrow
          hover
          @click="navigateTo('Accordion')"
        />
        <sar-list-item
          title="可选择的"
          arrow
          hover
          @click="navigateTo('Selectable')"
        />
        <sar-list-item
          title="严格选择"
          arrow
          hover
          @click="navigateTo('CheckStrictly')"
        />
        <sar-list-item
          title="默认展开以及默认选中"
          arrow
          hover
          @click="navigateTo('DefaultExpandedAndChecked')"
        />
        <sar-list-item
          title="单一选择"
          arrow
          hover
          @click="navigateTo('Single')"
        />
        <sar-list-item
          title="仅选择叶子节点"
          arrow
          hover
          @click="navigateTo('LeafOnly')"
        />
        <sar-list-item
          title="可拖拽的"
          arrow
          hover
          @click="navigateTo('Draggable')"
        />
        <sar-list-item
          title="可编辑的"
          arrow
          hover
          @click="navigateTo('Editable')"
        />
        <sar-list-item
          title="树节点过滤"
          arrow
          hover
          @click="navigateTo('Filter')"
        />
        <sar-list-item
          title="严格的树节点过滤"
          arrow
          hover
          @click="navigateTo('StrictFilter')"
        />
        <sar-list-item title="懒加载" arrow hover @click="navigateTo('Lazy')" />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/tree/demo/${url}`,
  })
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
