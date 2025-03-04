<template>
  <sar-list card>
    <sar-list-item>
      <sar-datetime-range-picker-input
        v-model="date"
        title="请选择日期"
        placeholder="请选择日期"
        :tabs="['开始日期', '结束日期']"
        clearable
        type="yMd"
        outlet-format="YYYY年MM月DD日"
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item title="当前值：" :value="displayText" />
    <sar-list-item
      title="设置为前一个月"
      arrow
      hover
      @click="
        date = [
          new Date(new Date().setMonth(new Date().getMonth() - 1)),
          new Date(),
        ]
      "
    />
    <sar-list-item title="清空" arrow hover @click="date = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const date = ref<Date[]>()

const displayText = computed(() => {
  return String(JSON.stringify(date.value))
})

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
