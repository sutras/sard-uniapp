<template>
  <sar-sticky :offset-top="safeAreaTop">
    <sar-button inline theme="danger">吸顶</sar-button>
  </sar-sticky>
</template>

<script lang="ts" setup>
import { safeAreaTop } from '@/utils'
</script>
