<template>
  <Locale>
    <slot></slot>
  </Locale>
</template>

<script setup lang="ts">
import { createContext, FC, ReactNode, useEffect, useMemo } from 'react'
import Locale from '../locale'
import { computed } from 'vue'

export interface ConfigProviderContext {
  theme: string
  lang: string
}

export const ConfigProviderContext = createContext<ConfigProviderContext>({
  theme: 'light',
  lang: 'zh-CN',
})

export interface ConfigProviderProps {
  theme?: string
  lang?: string
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {})

const context = computed(() => {
  return {
    theme: props.theme,
    lang: props.lang,
  }
})
</script>
