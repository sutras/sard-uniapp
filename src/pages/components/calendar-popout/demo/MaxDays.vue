<template>
  <sar-calendar-popout
    v-model="mulitpleValue"
    v-model:visible="mulitpleVisible"
    title="多个日期"
    type="multiple"
    :max-days="3"
    :over-max-days="() => toast('最多选择3天')"
  />

  <sar-calendar-popout
    v-model="rangeValue"
    v-model:visible="rangeVisible"
    title="范围选择"
    type="range"
    :max-days="3"
    :over-max-days="() => toast('最多选择3天')"
  />

  <sar-list card>
    <sar-list-item
      title="多个日期"
      arrow
      hover
      :value="JSON.stringify(mulitpleValue)"
      @click="mulitpleVisible = true"
    />
    <sar-list-item
      title="范围选择"
      arrow
      hover
      :value="JSON.stringify(rangeValue)"
      @click="rangeVisible = true"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const mulitpleValue = ref<Date[]>()
const rangeValue = ref<Date[]>()

const mulitpleVisible = ref(false)
const rangeVisible = ref(false)
</script>
