<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip
        v-model="value"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :disabled-date="disabledDate"
      />
    </sar-list-item>
    <sar-list-item title="说明" value="仅开放工作日" />
    <sar-list-item
      title="当前值"
      :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const value = ref<Date>()

const disabledDate = (date: Date) => {
  return [0, 6].includes(date.getDay())
}
</script>
