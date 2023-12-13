<template>
  <sar-switch v-model="checked" checked-color="var(--sar-red)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
