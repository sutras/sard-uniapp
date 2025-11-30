<template>
  <sar-avatar-group :total="avatarList.length" :max="max">
    <sar-avatar
      v-for="(item, index) in avatarList.slice(0, max)"
      :key="index"
      :index="index"
    >
      {{ item.text }}
    </sar-avatar>
  </sar-avatar-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatarList = ref(
  Array(3)
    .fill(0)
    .map((_, i) => ({ text: i + 1 })),
)
const max = 5
</script>
