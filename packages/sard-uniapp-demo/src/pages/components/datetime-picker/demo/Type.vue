<template>
  <sar-list card>
    <sar-list-item title="年月日" arrow hover @click="visible1 = true" />
    <sar-list-item title="时分秒" arrow hover @click="visible2 = true" />
    <sar-list-item title="月日时" arrow hover @click="visible3 = true" />
  </sar-list>

  <sar-popout v-model:visible="visible1" title="年月日">
    <template #visible="{ already }">
      <sar-datetime-picker v-if="already" type="yMd" />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="visible2" title="时分秒">
    <template #visible="{ already }">
      <sar-datetime-picker v-if="already" type="hms" />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="visible3" title="月日时">
    <template #visible="{ already }">
      <sar-datetime-picker v-if="already" type="Mdh" />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>
