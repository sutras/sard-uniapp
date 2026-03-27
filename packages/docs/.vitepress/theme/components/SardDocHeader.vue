<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type PageFrontmatter = {
  title?: string
  subtitle?: string
  version?: string
}

const { frontmatter } = useData()

const heading = computed(() => {
  const page = frontmatter.value as PageFrontmatter

  return {
    title: page.title?.trim() ?? '',
    subtitle: page.subtitle?.trim() ?? '',
    version: page.version?.trim() ?? '',
  }
})

const shouldRender = computed(() => {
  return Boolean(
    heading.value.title || heading.value.subtitle || heading.value.version,
  )
})
</script>

<template>
  <header v-if="shouldRender" class="sard-doc-header">
    <h1 class="sard-doc-header-title">
      <span v-if="heading.title">{{ heading.title }}</span>
      <span v-if="heading.subtitle" class="sard-doc-header-subtitle">
        {{ heading.subtitle }}
      </span>
      <sup v-if="heading.version" class="sard-doc-header-version">
        {{ heading.version }}
      </sup>
    </h1>
  </header>
</template>
