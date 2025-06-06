<template>
  <sar-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    type="range"
    :formatter="formatter"
    :current-date="new Date(new Date().getFullYear(), 4, 1)"
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
import type { CalendarDay } from 'sard-uniapp'
import { ref } from 'vue'

const value = ref<Date>()
const visible = ref(false)

const formatter = (day: CalendarDay) => {
  const year = day.date.getFullYear()
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()
  const week = day.date.getDay()

  if (month === 5) {
    if (date === 1) {
      day.bottom = '劳动节'
    }
    if (date <= 3) {
      day.top = '休'
    }
    if (date === 4) {
      day.bottom = '青年节'
    }

    if (week === 0) {
      const weekOnMonthStart = new Date(year, month - 1, 1).getDay()
      const secondSunday = 15 - (weekOnMonthStart || 7)

      if (secondSunday === date) {
        day.bottom = '母亲节'
      }
    }
  }

  if (day.type === 'start') {
    day.bottom = '入店'
  } else if (day.type === 'end') {
    day.bottom = '离店'
  }

  if (week === 0 || week === 6) {
    day.style = {
      fontWeight: 'bold',
      color: 'var(--sar-red)',
    }
  }
}
</script>
