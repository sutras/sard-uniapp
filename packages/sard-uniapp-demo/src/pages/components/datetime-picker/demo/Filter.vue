<template>
  <sar-list card>
    <sar-list-item
      title="取15的倍数的分钟数"
      arrow
      hover
      @click="visible = true"
    />
  </sar-list>

  <sar-popout v-model:visible="visible" title="取15的倍数的分钟数">
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        v-model="date"
        type="hm"
        :filter="filter"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DatetimeLetter } from 'sard-uniapp'

const visible = ref(false)
const date = ref<Date>()

const filter = (letter: DatetimeLetter, value: number) => {
  if (letter === 'm') {
    return value % 15 === 0
  }
  return true
}
</script>
