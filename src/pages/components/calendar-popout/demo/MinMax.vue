<template>
  <sar-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    :min="new Date(2000, 0, 7)"
    :max="new Date(2000, 0, 21)"
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

const value = ref<string>()
const visible = ref(false)
</script>
