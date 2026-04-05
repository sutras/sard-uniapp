<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip v-model="value" @change="onChange" />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'"
    />
    <sar-list-item title="设置为今天" arrow hover @click="value = new Date()" />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const value = ref<Date | undefined>(new Date())

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
