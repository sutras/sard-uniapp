<template>
  <sar-segmented
    class="mx-32 mb-20"
    model-value="english"
    :options="['chinese', 'english']"
    @change="plateKeyboard?.toggle"
  />
  <sar-keyboard ref="plateKeyboard" type="plate" mode="english" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type KeyBoardExpose } from 'sard-uniapp'

const plateKeyboard = ref<KeyBoardExpose>()
</script>
