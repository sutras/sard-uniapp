<template>
  <sar-segmented v-model="value" :options="options" shape="round" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options = ['Daily', 'Weekly', 'Monthly']

const value = ref('Daily')
</script>
