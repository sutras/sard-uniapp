<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="基础用法">
    <sar-floating-panel>
      <sar-list>
        <sar-list-item
          v-for="i in 26"
          :key="i"
          :title="String.fromCharCode(i + 64)"
        ></sar-list-item>
      </sar-list>
    </sar-floating-panel>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
