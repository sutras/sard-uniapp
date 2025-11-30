<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="BackTop 回到顶部">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基础用法"
          arrow
          hover
          @click="navigateTo('Basic')"
        />
        <sar-list-item
          title="scroll-view 组件滚动"
          arrow
          hover
          @click="navigateTo('ScrollView')"
        />
        <sar-list-item
          title="按钮位置"
          arrow
          hover
          @click="navigateTo('Position')"
        />
        <sar-list-item
          title="滚动时长"
          arrow
          hover
          @click="navigateTo('Duration')"
        />
        <sar-list-item
          title="可见时的高度"
          arrow
          hover
          @click="navigateTo('VisibleHeight')"
        />
        <sar-list-item
          title="自定义按钮内容"
          arrow
          hover
          @click="navigateTo('CustomContent')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/back-top/demo/${url}`,
  })
}

const { isLocked } = useCurrentPageLock()
</script>
