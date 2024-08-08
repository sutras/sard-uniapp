<template>
  <doc-page>
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
      <DemoColor v-if="currentDemo === 'Color'" />
      <DemoHideName v-if="currentDemo === 'HideName'" />
      <DemoTopLeft v-if="currentDemo === 'TopLeft'" />
      <DemoTopRight v-if="currentDemo === 'TopRight'" />
      <DemoBottomLeft v-if="currentDemo === 'BottomLeft'" />
      <DemoNonItemList v-if="currentDemo === 'NonItemList'" />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBasic from './demo/Basic.vue'
import DemoColor from './demo/Color.vue'
import DemoHideName from './demo/HideName.vue'
import DemoTopLeft from './demo/TopLeft.vue'
import DemoTopRight from './demo/TopRight.vue'
import DemoBottomLeft from './demo/BottomLeft.vue'
import DemoNonItemList from './demo/NonItemList.vue'

const currentDemo = ref('Basic')

const demoOptions = [
  { value: 'Basic', label: '基础用法' },
  { value: 'Color', label: '自定义颜色' },
  { value: 'HideName', label: '隐藏按钮名称' },
  { value: 'TopLeft', label: '左上角显示' },
  { value: 'TopRight', label: '右上角显示' },
  { value: 'BottomLeft', label: '左下角显示' },
  { value: 'NonItemList', label: '无按钮列表显示' },
]
</script>
