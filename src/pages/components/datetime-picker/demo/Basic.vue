<template>
  <!-- <sar-datetime-picker-input
    v-model="datetime"
    type="yMd"
    value-format="YYYY-MM-DD"
    min="2025-09-29"
    placeholder="请选择时间"
  /> -->
  <sar-datetime-picker
    v-model="datetime"
    type="yMdhm"
    outlet-format="YYYY-MM-DD HH:mm"
    :min="new Date()"
    placeholder="请选择时间"
  />

  <sar-list card>
    <sar-list-item>
      <sar-datetime-picker v-model="date" type="yMd" @change="onChange" />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="date ? formatDate(date, 'YYYY-MM-DD') : String(date)"
    />
    <sar-list-item
      title="设置为当前时间"
      arrow
      hover
      @click="date = new Date()"
    />
    <sar-list-item title="清空" arrow hover @click="date = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const datetime = ref()

const date = ref<Date>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
