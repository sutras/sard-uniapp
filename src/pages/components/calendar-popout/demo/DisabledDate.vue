<template>
  <sar-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    :disabled-date="disabledDate"
    value-format="YYYY-MM-DD"
  />

  <sar-list card>
    <sar-list-item
      title="请选择日期"
      arrow
      hover
      :value="JSON.stringify(value)"
      @click="visible = true"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date>()
const visible = ref(false)

const disabledDate = (date: Date) => {
  return /0|6/.test(String(date.getDay()))
}
</script>
