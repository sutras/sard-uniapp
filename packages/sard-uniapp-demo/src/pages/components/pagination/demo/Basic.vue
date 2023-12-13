<template>
  <sar-pagination :total="100" v-model:current="current" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
