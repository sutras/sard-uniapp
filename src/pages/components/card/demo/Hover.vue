<template>
  <sar-card title="Trumpet to the Son of Heaven" hover @click="onClick">
    {{ content }}
  </sar-card>
</template>

<script setup lang="ts">
import { content } from './shared'

const onClick = () => {
  console.log('click')
}
</script>
