<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip
        v-model="value"
        :min="new Date(2024, 0, 5)"
        :max="new Date(2024, 0, 19)"
      />
    </sar-list-item>
    <sar-list-item title="可选范围" value="2024-01-05 至 2024-01-19" />
    <sar-list-item
      title="当前值"
      :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const value = ref(new Date(2024, 0, 10))
</script>
