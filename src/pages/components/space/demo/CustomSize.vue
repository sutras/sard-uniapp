<template>
  <sar-space direction="vertical" size="large">
    <sar-slider v-model="size" :min="0" :max="80" show-value />

    <sar-space :size="size + 'rpx'">
      <sar-button>按钮</sar-button>
      <sar-button>按钮</sar-button>
      <sar-button>按钮</sar-button>
    </sar-space>
  </sar-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(10)
</script>
