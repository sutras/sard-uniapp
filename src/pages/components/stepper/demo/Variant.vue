<template>
  <sar-switch
    v-model="disabled"
    checked-text="启用"
    unchecked-text="禁用"
    class="mb-20"
  />

  <sar-space direction="vertical">
    <sar-stepper placeholder="数量" :disabled="disabled" variant="solid" />
    <sar-stepper placeholder="数量" :disabled="disabled" variant="outline" />
    <sar-stepper placeholder="数量" :disabled="disabled" variant="accent" />
    <sar-stepper placeholder="数量" :disabled="disabled" variant="ghost" />
  </sar-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
</script>
