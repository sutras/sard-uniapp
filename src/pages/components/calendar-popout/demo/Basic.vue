<template>
  <sar-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    @change="onChange"
  />

  <sar-list card>
    <sar-list-item>
      <sar-button @click="visible = true">
        {{ value ? formatDate(value, 'YYYY-MM-DD') : '请选择' }}
      </sar-button>
    </sar-list-item>
    <sar-list-item title="设置为今天" arrow hover @click="value = new Date()" />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const value = ref<Date | undefined>(new Date())
const visible = ref(false)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
