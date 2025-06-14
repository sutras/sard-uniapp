<template>
  <sar-list card>
    <sar-list-item>
      <sar-picker
        v-model="value"
        :columns="columns"
        :option-keys="{ label: 'name', value: 'code' }"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item title="设置为: 天津市" arrow hover @click="value = 120000" />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    code: 110000,
    name: '北京市',
  },
  {
    code: 120000,
    name: '天津市',
  },
  {
    code: 130000,
    name: '河北省',
  },
  {
    code: 140000,
    name: '山东省',
  },
]

const value = ref<number | undefined>(130000)
</script>
