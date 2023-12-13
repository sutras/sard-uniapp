<template>
  <sar-pagination :total="100" :page-size="10" v-model:current="current">
    <template #prev>
      <sar-icon name="left" />
    </template>
    <template #next>
      <sar-icon name="right" />
    </template>
  </sar-pagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
