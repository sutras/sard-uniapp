<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip
        v-model="value"
        :min="new Date(2024, 1, 8)"
        :max="new Date(2024, 1, 16)"
        show-lunar
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
import { formatDate } from 'sard-uniapp'

const value = ref(new Date(2024, 1, 10))
</script>
