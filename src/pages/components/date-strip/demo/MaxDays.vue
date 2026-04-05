<template>
  <sar-list card title="多选（最多3天）">
    <sar-list-item>
      <sar-date-strip
        v-model="multipleValue"
        type="multiple"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :max-days="3"
        :over-max-days="onOverMaxDays"
      />
    </sar-list-item>
    <sar-list-item title="当前值" :value="formatValues(multipleValue)" />
  </sar-list>

  <sar-list card title="范围（最多5天）">
    <sar-list-item>
      <sar-date-strip
        v-model="rangeValue"
        type="range"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 20)"
        :max-days="5"
        :over-max-days="onOverMaxDays"
      />
    </sar-list-item>
    <sar-list-item title="当前值" :value="formatValues(rangeValue)" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const multipleValue = ref<Date[]>([])
const rangeValue = ref<Date[]>([])

const formatValues = (value: Date[]) => {
  return JSON.stringify(value.map((item) => formatDate(item, 'YYYY-MM-DD')))
}

const onOverMaxDays = () => {
  uni.showToast({
    title: '已超过最大可选天数',
    icon: 'none',
  })
}
</script>
