<template>
  <sar-list card>
    <sar-list-item>
      <sar-ellipsis
        :content="contentEn"
        expand-text="展开"
        collapse-text="收起"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { contentEn } from './shared'
</script>
