<template>
  <sar-sidebar v-model:current="current">
    <sar-sidebar-item name="1">
      <sar-badge dot>标签名称</sar-badge>
    </sar-sidebar-item>
    <sar-sidebar-item name="2">
      <sar-badge :value="10">标签名称</sar-badge>
    </sar-sidebar-item>
    <sar-sidebar-item name="3">
      <sar-badge color="var(--sar-green)" value="推荐">标签名称</sar-badge>
    </sar-sidebar-item>
  </sar-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref('1')
</script>
