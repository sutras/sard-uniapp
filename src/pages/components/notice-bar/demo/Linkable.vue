<template>
  <sar-notice-bar linkable @click="onClick">
    这是一条很长很长很长很长很长很长很长很长很长很长的公告！
  </sar-notice-bar>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onClick = () => {
  toast('navigate to')
}
</script>
