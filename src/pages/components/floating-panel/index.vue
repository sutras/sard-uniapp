<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="FloatingPanel 浮动面板">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基础用法"
          arrow
          hover
          @click="navigateTo('Basic')"
        />
        <sar-list-item
          title="自定义锚点"
          arrow
          hover
          @click="navigateTo('Anchors')"
        />
        <sar-list-item
          title="仅头部拖拽"
          arrow
          hover
          @click="navigateTo('ContentDraggable')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/floating-panel/demo/${url}`,
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
