<template>
  <sar-accordion v-model="value" hide-border>
    <sar-accordion-item title="标题1" name="1">内容1</sar-accordion-item>
    <sar-accordion-item title="标题2" name="2">内容2</sar-accordion-item>
    <sar-accordion-item title="标题3" name="3">内容3</sar-accordion-item>
  </sar-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
