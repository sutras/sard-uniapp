<template>
  <sar-dropdown disabled>
    <sar-dropdown-item :options="options1" model-value="1" />
    <sar-dropdown-item :options="options2" model-value="2" />
  </sar-dropdown>
</template>

<script setup lang="ts">
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
</script>
