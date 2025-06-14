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
      @click="value = ['2003年', '10月']"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  Array(10)
    .fill(0)
    .map((_, index) => 2000 + index + '年'),
  Array(12)
    .fill(0)
    .map((_, index) => 1 + index + '月'),
]

const value = ref<string[] | undefined>(['2005年', '5月'])
</script>
