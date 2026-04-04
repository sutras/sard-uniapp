<template>
  <sar-list card>
    <sar-list-item>
      <sar-ellipsis
        :content="contentEn"
        :rows="3"
        position="start"
        expand-text="更多"
        collapse-text="收起"
      />
    </sar-list-item>
    <sar-list-item>
      <sar-ellipsis
        :content="contentEn"
        :rows="3"
        position="middle"
        expand-text="更多"
        collapse-text="收起"
      />
    </sar-list-item>
    <sar-list-item>
      <sar-ellipsis
        :content="contentEn"
        :rows="3"
        position="end"
        expand-text="更多"
        collapse-text="收起"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { contentEn } from './shared'
</script>
