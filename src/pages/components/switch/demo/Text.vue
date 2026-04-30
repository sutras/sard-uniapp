<template>
  <sar-switch v-model="checked" checked-text="开启" unchecked-text="关闭" />
  <sar-switch
    v-model="checked"
    checked-text="开启（长文本）"
    unchecked-text="关闭"
    class="ml-20"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
