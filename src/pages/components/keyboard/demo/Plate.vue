<template>
  <sar-segmented
    class="mx-32 mb-20"
    v-model="mode"
    :options="['chinese', 'english']"
    @change="(newMode) => (mode = newMode)"
  />
  <sar-keyboard type="plate" v-model:mode="mode" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type KeyboardPlateMode } from 'sard-uniapp'

const mode = ref<KeyboardPlateMode>('english')
</script>
