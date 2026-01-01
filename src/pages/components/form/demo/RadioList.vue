<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <sar-radio-group v-model="value">
    <template #custom="{ toggle }">
      <sar-list hide-border>
        <sar-list-item
          v-for="option in options"
          :key="option.value"
          :title="option.label"
          @click="toggle(option.value)"
        >
          <template #icon>
            <sar-radio readonly :value="option.value" />
          </template>
        </sar-list-item>
      </sar-list>
    </template>
  </sar-radio-group>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
const value = defineModel<string>()

defineProps<{
  options: {
    label: string
    value: string
  }[]
}>()

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
