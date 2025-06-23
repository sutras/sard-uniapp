<template>
  <sar-read-more
    keep-location
    close-text="展开阅读全文"
    open-text="收起节约空间"
  >
    {{ text }}
  </sar-read-more>
</template>

<script lang="ts" setup>
import { text } from './data'
</script>
