<template>
  <sar-count-to :value="number" />

  <sar-button @click="onClick">滚动到 {{ number }}</sar-button>
</template>

<script setup lang="ts">
import { random } from 'sard-uniapp'
import { ref } from 'vue'

const number = ref(random(100, 5000))

const onClick = () => {
  number.value = random(100, 5000)
}
</script>
