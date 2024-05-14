<template>
  <sar-list card>
    <sar-list-item
      title="2000年5月13日 -> 2003年6月8日"
      arrow
      hover
      @click="visible1 = true"
    />
    <sar-list-item
      title="9时0分0秒 -> 18时30分0秒"
      arrow
      hover
      @click="visible2 = true"
    />
  </sar-list>

  <sar-popout v-model:visible="visible1" title="单个日期">
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        type="yMd"
        :min="new Date(2000, 4, 13)"
        :max="new Date(2003, 6, 8)"
      />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="visible2" title="多个日期">
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        type="hms"
        :min="new Date(0, 0, 1, 9, 0, 0)"
        :max="new Date(0, 0, 1, 18, 30, 0)"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
</script>
