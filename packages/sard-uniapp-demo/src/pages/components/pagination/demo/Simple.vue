<template>
  <sar-pagination
    :total="43"
    :page-size="10"
    type="simple"
    v-model:current="current"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
