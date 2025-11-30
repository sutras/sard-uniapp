<template>
  <sar-sticky :offset-top="safeAreaTop">
    <sar-button inline theme="danger">吸顶</sar-button>
  </sar-sticky>
</template>

<script setup lang="ts">
import { safeAreaTop } from '@/utils'
</script>
