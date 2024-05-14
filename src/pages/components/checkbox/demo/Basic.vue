<template>
  <sar-checkbox v-model:checked="checked">
    {{ checked ? '已选中' : '未选中' }}
  </sar-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
