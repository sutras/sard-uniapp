<template>
  <sar-dropdown direction="up">
    <sar-dropdown-item
      v-model="value1"
      :options="options1"
      :before-close="beforeClose"
    />
    <sar-dropdown-item
      v-model="value2"
      :options="options2"
      :before-close="beforeClose"
    />
  </sar-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type DropdownCloseType } from 'sard-uniapp'

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
const options2 = [
  {
    label: '30分钟内',
    value: '1',
  },
  {
    label: '40分钟内',
    value: '2',
  },
  {
    label: '50分钟内',
    value: '3',
  },
]

const value1 = ref('1')
const value2 = ref('1')

const beforeClose = (type: DropdownCloseType) => {
  if (type === 'option') {
    toast.loading('加载中', {
      overlay: true,
    })
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    }).finally(() => {
      toast.hide()
    })
  }
}
</script>
