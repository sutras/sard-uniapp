<template>
  <sar-dropdown>
    <sar-dropdown-item :options="options1" model-value="1" />
    <sar-dropdown-item title="筛选" v-model:visible="visible">
      <sar-list inlaid>
        <sar-list-item title="包邮">
          <template #value>
            <sar-switch :model-value="true" />
          </template>
        </sar-list-item>
        <sar-list-item title="团购">
          <template #value>
            <sar-switch />
          </template>
        </sar-list-item>
        <sar-list-item>
          <sar-button round @click="visible = false">确认</sar-button>
        </sar-list-item>
      </sar-list>
    </sar-dropdown-item>
  </sar-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options1 = [
  {
    label: '距离优先',
    value: '1',
  },
  {
    label: '速度优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]

const visible = ref(false)
</script>
