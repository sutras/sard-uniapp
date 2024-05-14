<template>
  <sar-pagination
    :total="100"
    :page-size="10"
    ellipsis
    v-model:current="current"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
