<template>
  <sar-list card>
    <sar-list-item>
      <sar-datetime-range-picker-input
        v-model="value"
        title="请选择日期"
        placeholder="请选择日期"
        :tabs="['开始日期', '结束日期']"
        clearable
        type="yMd"
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item
      title="设置为前一个月"
      arrow
      hover
      @click="
        value = [
          new Date(new Date().setMonth(new Date().getMonth() - 1)),
          new Date(),
        ]
      "
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
