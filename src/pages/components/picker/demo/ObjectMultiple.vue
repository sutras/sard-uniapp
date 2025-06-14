<template>
  <sar-list card>
    <sar-list-item>
      <sar-picker v-model="value" :columns="columns" />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item
      title="设置为: 2003年10月"
      arrow
      hover
      @click="value = [2003, 10]"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  Array(10)
    .fill(0)
    .map((_, index) => ({
      value: 2000 + index,
      label: 2000 + index + '年',
    })),
  Array(12)
    .fill(0)
    .map((_, index) => ({
      value: 1 + index,
      label: 1 + index + '月',
    })),
]

const value = ref<number[] | undefined>([2005, 5])
</script>
