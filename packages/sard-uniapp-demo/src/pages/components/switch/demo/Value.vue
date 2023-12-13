<template>
  <sar-switch v-model="value" checked-value="on" unchecked-value="off" />
  <view>{{ value }}</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('on')
</script>
