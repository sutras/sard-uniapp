<template>
  <sar-segmented v-model="value" :options="options" :size="value" />
</template>

<script lang="ts" setup>
import { type SegmentedSize } from 'sard-uniapp'
import { ref } from 'vue'

const options: SegmentedSize[] = ['small', 'middle', 'large']

const value = ref<SegmentedSize>('middle')
</script>
