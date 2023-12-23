<template>
  <sar-list card>
    <sar-list-item>
      <sar-calendar v-model="value" />
    </sar-list-item>
    <sar-list-item title="当前值：" :value="value?.toLocaleString()" />
    <sar-list-item title="设置为今天" arrow hover @click="value = new Date()" />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date | undefined>(new Date())
</script>
