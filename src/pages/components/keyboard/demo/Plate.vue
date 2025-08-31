<template>
  <sar-segmented
    v-model="mode"
    class="mx-32 mb-20"
    :options="['chinese', 'english']"
  />
  <sar-keyboard v-model:mode="mode" type="plate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type KeyboardPlateMode } from 'sard-uniapp'

const mode = ref<KeyboardPlateMode>('chinese')
</script>
