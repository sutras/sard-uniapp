<template>
  <sar-list card>
    <sar-list-item>
      <sar-date-strip
        v-model="value"
        style="
          --sar-date-strip-column-gap: 0px;
          --sar-date-strip-item-border-radius: 0px;
          --sar-date-strip-item-selected-bg: var(--sar-warning);
          --sar-date-strip-item-today-color: var(--sar-warning);
          --sar-date-strip-item-middle-bg: rgba(var(--sar-warning-rgb), 0.15);
          --sar-date-strip-item-week-order: 3;
          background: var(--sar-body-bg);
        "
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item title="当前值" :value="formatDate(value, 'YYYY-MM-DD')" />
  </sar-list>
</template>

<script setup lang="ts">
import { formatDate } from 'sard-uniapp'
import { ref } from 'vue'

const value = ref<Date>(new Date())

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
