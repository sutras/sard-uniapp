<template>
  <sar-search
    placeholder="请输入关键词"
    search="搜索"
    @search="toast($event)"
  />
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
</script>
