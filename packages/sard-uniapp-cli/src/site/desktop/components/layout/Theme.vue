<template>
  <div class="doc-theme" @click="toggleTheme">
    <span :class="mapThemeIcon[theme]"></span>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue'

const theme = inject<Ref<'light' | 'dark'>>('theme', ref('light'))

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const mapThemeIcon = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
}
</script>
