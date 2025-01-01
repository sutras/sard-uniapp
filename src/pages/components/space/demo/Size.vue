<template>
  <sar-space direction="vertical" size="large">
    <sar-radio-group
      v-model="size"
      direction="horizontal"
      :options="spaceSizes"
    />

    <sar-space :size="size">
      <sar-button>按钮</sar-button>
      <sar-button>按钮</sar-button>
      <sar-button>按钮</sar-button>
    </sar-space>
  </sar-space>
</template>

<script lang="ts" setup>
import { spaceSizes, type SpaceSize } from 'sard-uniapp'
import { ref } from 'vue'

const size = ref<SpaceSize>('middle')
</script>
