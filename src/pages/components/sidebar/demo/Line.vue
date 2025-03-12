<template>
  <sar-sidebar v-model:current="current" line>
    <sar-sidebar-item name="1" title="标签名称" />
    <sar-sidebar-item name="2" title="标签名称" />
    <sar-sidebar-item name="3" title="标签名称" />
  </sar-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref('1')
</script>
