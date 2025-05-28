<template>
  <sar-calendar-popout
    v-model="singleValue"
    v-model:visible="singleVisible"
    title="单个日期"
    value-format="YYYY-MM-DD"
  />
  <sar-calendar-popout
    v-model="mulitpleValue"
    v-model:visible="mulitpleVisible"
    type="multiple"
    title="多个日期"
    value-format="YYYY-MM-DD"
  />
  <sar-calendar-popout
    v-model="rangeValue"
    v-model:visible="rangeVisible"
    type="range"
    title="单个日期"
    value-format="YYYY-MM-DD"
  />

  <sar-list card>
    <sar-list-item
      title="单个日期"
      arrow
      hover
      :value="JSON.stringify(singleValue)"
      @click="singleVisible = true"
    />
    <sar-list-item
      title="多个日期"
      arrow
      hover
      :value="JSON.stringify(mulitpleValue)"
      @click="mulitpleVisible = true"
    />
    <sar-list-item
      title="范围选择"
      arrow
      hover
      :value="JSON.stringify(rangeValue)"
      @click="rangeVisible = true"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const singleValue = ref<string>()
const mulitpleValue = ref<string[]>()
const rangeValue = ref<string[]>()

const singleVisible = ref(false)
const mulitpleVisible = ref(false)
const rangeVisible = ref(false)
</script>
