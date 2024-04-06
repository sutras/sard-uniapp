<template>
  <sar-tag theme="primary" closable @close="onClose">标签</sar-tag>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onClose = () => {
  toast('关闭')
}
</script>
