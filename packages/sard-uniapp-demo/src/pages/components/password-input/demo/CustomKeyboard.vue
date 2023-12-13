<template>
  <sar-password-input
    v-model="value"
    type="underline"
    customKeyboard
    focused
    root-style="margin-bottom: 20rpx"
  />
  <sar-keyboard
    @input="(v: string) => (value = (value + v).slice(0, 6))"
    @delete="value = value.slice(0, -1)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
