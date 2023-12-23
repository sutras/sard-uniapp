<template>
  <sar-list card>
    <sar-list-item
      title="多个日期"
      arrow
      hover
      @click="mulitpleVisible = true"
    />
    <sar-list-item title="范围选择" arrow hover @click="rangeVisible = true" />
  </sar-list>

  <sar-popout v-model:visible="mulitpleVisible" title="多个日期">
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        type="multiple"
        :max-days="3"
        :over-max-days="() => toast('最多选择3天')"
      />
    </template>
  </sar-popout>

  <sar-popout v-model:visible="rangeVisible" title="范围选择">
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        type="range"
        :max-days="3"
        :over-max-days="() => toast('最多选择3天')"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const mulitpleVisible = ref(false)
const rangeVisible = ref(false)
</script>
