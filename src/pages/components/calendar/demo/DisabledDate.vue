<template>
  <sar-list card>
    <sar-list-item title="请选择日期" arrow hover @click="visible = true" />
  </sar-list>

  <sar-popout v-model:visible="visible" title="请选择日期">
    <template #visible="{ already }">
      <sar-calendar v-if="already" :disabled-date="disabledDate" />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const disabledDate = (date: Date) => {
  return /0|6/.test(String(date.getDay()))
}
</script>
