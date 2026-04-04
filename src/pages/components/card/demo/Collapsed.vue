<template>
  <sar-card title="Trumpet to the Son of Heaven" :collapsed="collapsed">
    <template #extra>
      <sar-button
        type="pale-text"
        class="h-auto"
        @click="collapsed = !collapsed"
      >
        <sar-icon size="32rpx" :name="collapsed ? 'down' : 'up'" />
      </sar-button>
    </template>
    {{ content }}
  </sar-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { content } from './shared'

const collapsed = ref(true)
</script>
