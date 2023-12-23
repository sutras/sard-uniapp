<template>
  <color-box v-for="(color, i) in themeColors" :key="i" :color="color" />
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const themeColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
]
</script>
