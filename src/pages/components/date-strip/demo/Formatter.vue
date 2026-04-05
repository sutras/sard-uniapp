<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip
        v-model="value"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :formatter="formatter"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值"
      :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate, type CalendarDay } from 'sard-uniapp'

const value = ref(new Date(2024, 0, 6))

const formatter = (day: CalendarDay) => {
  if ([0, 6].includes(day.date.getDay())) {
    day.bottom = '休'
    day.style =
      day.type === 'selected'
        ? null
        : {
            backgroundColor: 'rgba(var(--sar-orange-rgb), 0.08)',
            color: 'var(--sar-warning)',
            borderColor: 'rgba(var(--sar-orange-rgb), 0.2)',
          }
  }

  if (day.date.getDate() === 8) {
    day.top = '今天'
    day.bottom = '出发'
  }
}
</script>
