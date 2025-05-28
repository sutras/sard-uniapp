<template>
  <sar-datetime-picker-popout
    v-model="date1"
    v-model:visible="visible1"
    title="年月日"
    type="yMd"
    value-format="YYYY-MM-DD"
  />

  <sar-datetime-picker-popout
    v-model="date2"
    v-model:visible="visible2"
    title="时分秒"
    type="hms"
    value-format="HH:mm:ss"
  />

  <sar-datetime-picker-popout
    v-model="date3"
    v-model:visible="visible3"
    title="月日时"
    type="Mdh"
    value-format="MM-DD HH"
  />

  <sar-list card>
    <sar-list-item
      title="年月日"
      arrow
      hover
      :value="JSON.stringify(date1)"
      @click="visible1 = true"
    />
    <sar-list-item
      title="时分秒"
      arrow
      hover
      :value="JSON.stringify(date2)"
      @click="visible2 = true"
    />
    <sar-list-item
      title="月日时"
      arrow
      hover
      :value="JSON.stringify(date3)"
      @click="visible3 = true"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date1 = ref<Date>()
const date2 = ref<Date>()
const date3 = ref<Date>()

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>
