<template>
  <sar-list card>
    <sar-list-item title="请选择日期" arrow hover @click="visible = true" />
  </sar-list>

  <sar-popout v-model:visible="visible" title="请选择日期">
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        :min="new Date(2000, 0, 7)"
        :max="new Date(2000, 0, 21)"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
