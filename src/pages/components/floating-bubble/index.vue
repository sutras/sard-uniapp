<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="FloatingBubble 浮动气泡">
    <doc-demo>
      <sar-radio-group v-model="currentDemo">
        <template #custom="{ toggle }">
          <sar-list card>
            <sar-list-item
              v-for="option in demoOptions"
              :key="option.value"
              :title="option.label"
              hover
              @click="toggle(option.value)"
            >
              <template #value>
                <sar-radio readonly :value="option.value" />
              </template>
            </sar-list-item>
          </sar-list>
        </template>
      </sar-radio-group>

      <DemoBasic v-if="currentDemo === 'Basic'" />
      <DemoMagnet v-else-if="currentDemo === 'Magnet'" />
      <DemoOffset v-else-if="currentDemo === 'Offset'" />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { ref } from 'vue'
import DemoBasic from './demo/Basic.vue'
import DemoMagnet from './demo/Magnet.vue'
import DemoOffset from './demo/Offset.vue'

const currentDemo = ref('Basic')

const demoOptions = [
  { value: 'Basic', label: '基础用法' },
  { value: 'Magnet', label: '自由拖拽和磁吸' },
  { value: 'Offset', label: '双向绑定' },
]

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>
