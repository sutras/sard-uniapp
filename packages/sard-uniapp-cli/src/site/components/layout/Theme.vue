<template>
  <div class="doc-theme" @click="toggleTheme">
    <i :class="icon"></i>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

const context = inject<any>('theme')

const toggleTheme = () => {
  if (context) {
    context.toggle()
  }
}

const mapThemeIcon = {
  light: 'hsi hsi-sun-fill',
  dark: 'hsi hsi-moon-stars-fill',
}

const icon = computed(() => {
  return mapThemeIcon[context?.theme.value || 'light']
})
</script>

<style lang="scss" scoped>
.doc-theme {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: var(--doc-secondary-color);
  cursor: pointer;
}
</style>
