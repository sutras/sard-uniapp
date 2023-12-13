<template>
  <sar-search
    placeholder="请输入关键词"
    cancel="取消"
    @cancel="toast('取消')"
  />
</template>

<script setup lang="ts">
import { toast } from '@sard/uniapp'
</script>
