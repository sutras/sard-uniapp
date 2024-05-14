<template>
  <sar-list card>
    <sar-list-item title="单个日期" arrow hover @click="singleVisible = true" />
    <sar-list-item
      title="多个日期"
      arrow
      hover
      @click="mulitpleVisible = true"
    />
    <sar-list-item title="范围选择" arrow hover @click="rangeVisible = true" />
  </sar-list>

  <sar-popout v-model:visible="singleVisible" title="单个日期">
    <template #visible="{ already }">
      <sar-calendar v-if="already" />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="mulitpleVisible" title="多个日期">
    <template #visible="{ already }">
      <sar-calendar v-if="already" type="multiple" />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="rangeVisible" title="范围选择">
    <template #visible="{ already }">
      <sar-calendar v-if="already" type="range" />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const singleVisible = ref(false)
const mulitpleVisible = ref(false)
const rangeVisible = ref(false)
</script>
