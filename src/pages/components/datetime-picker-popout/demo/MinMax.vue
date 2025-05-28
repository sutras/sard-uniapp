<template>
  <sar-datetime-picker-popout
    v-model="date1"
    v-model:visible="visible1"
    type="yMd"
    :min="new Date(2000, 4, 13)"
    :max="new Date(2003, 6, 8)"
  />

  <sar-datetime-picker-popout
    v-model="date2"
    v-model:visible="visible2"
    type="hms"
    :min="new Date(0, 0, 1, 9, 0, 0)"
    :max="new Date(0, 0, 1, 18, 30, 0)"
  />

  <sar-list card>
    <sar-list-item
      title="2000年5月13日 -> 2003年6月8日"
      arrow
      hover
      :value="JSON.stringify(date1)"
      @click="visible1 = true"
    />
    <sar-list-item
      title="9时0分0秒 -> 18时30分0秒"
      arrow
      hover
      :value="JSON.stringify(date2)"
      @click="visible2 = true"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date1 = ref<Date>()
const date2 = ref<Date>()

const visible1 = ref(false)
const visible2 = ref(false)
</script>
