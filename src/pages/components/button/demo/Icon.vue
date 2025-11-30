<template>
  <sar-space align="center">
    <sar-button :loading="loading" type="mild" size="mini" icon="plus" />
    <sar-button :loading="loading" type="mild" size="small" icon="plus" />
    <sar-button :loading="loading" type="mild" size="medium" icon="plus" />
    <sar-button :loading="loading" type="mild" size="large" icon="plus" />
  </sar-space>

  <sar-space align="center">
    <sar-button :loading="loading" round size="mini" icon="plus" />
    <sar-button :loading="loading" round size="small" icon="plus" />
    <sar-button :loading="loading" round size="medium" icon="plus" />
    <sar-button :loading="loading" round size="large" icon="plus" />
  </sar-space>

  <sar-space align="center">
    <sar-button :loading="loading" type="outline" size="mini" icon="plus">
      按钮
    </sar-button>
    <sar-button :loading="loading" type="outline" size="small" icon="plus">
      按钮
    </sar-button>
    <sar-button :loading="loading" type="outline" size="medium" icon="plus">
      按钮
    </sar-button>
    <sar-button :loading="loading" type="outline" size="large" icon="plus">
      按钮
    </sar-button>
  </sar-space>

  <sar-button @click="loading = !loading">toggle loading</sar-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
</script>
