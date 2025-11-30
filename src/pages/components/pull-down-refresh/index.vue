<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="PullDownRefresh 下拉刷新">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基于页面的刷新"
          arrow
          hover
          @click="navigateTo('Page')"
        />
        <sar-list-item
          title="基于 scroll-view 的刷新"
          arrow
          hover
          @click="navigateTo('ScrollView')"
        />
        <sar-list-item
          title="自定义插槽"
          arrow
          hover
          @click="navigateTo('Slot')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/pull-down-refresh/demo/${url}`,
  })
}

const { isLocked } = useCurrentPageLock()
</script>
