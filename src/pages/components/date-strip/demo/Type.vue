<template>
  <sar-list card title="单选">
    <sar-list-item>
      <sar-date-strip v-model="singleValue" />
    </sar-list-item>
    <sar-list-item
      title="当前值"
      :value="singleValue ? formatDate(singleValue, 'YYYY-MM-DD') : 'undefined'"
    />
  </sar-list>

  <sar-list card title="多选">
    <sar-list-item>
      <sar-date-strip v-model="multipleValue" type="multiple" />
    </sar-list-item>
    <sar-list-item title="当前值" :value="formatValues(multipleValue)" />
  </sar-list>

  <sar-list card title="范围选择">
    <sar-list-item>
      <sar-date-strip v-model="rangeValue" type="range" />
    </sar-list-item>
    <sar-list-item title="当前值" :value="formatValues(rangeValue)" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const singleValue = ref<Date | undefined>(new Date())
const multipleValue = ref<Date[]>([new Date()])
const rangeValue = ref<Date[]>([])

const formatValues = (value: Date[]) => {
  return JSON.stringify(value.map((item) => formatDate(item, 'YYYY-MM-DD')))
}
</script>
