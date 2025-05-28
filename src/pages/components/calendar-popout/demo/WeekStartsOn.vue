<template>
  <sar-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    :week-starts-on="1"
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
</script>
