<template>
  <sar-list card>
    <sar-list-item>
      <sar-datetime-picker-input
        v-model="value"
        title="请选择日期"
        placeholder="请选择日期"
        clearable
        type="yMd"
        outlet-format="YYYY年MM月DD日"
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="value ? formatDate(value, 'YYYY-MM-DD') : String(value)"
    />
    <sar-list-item
      title="设置为当前时间"
      arrow
      hover
      @click="value = new Date()"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard-uniapp'

const value = ref<Date>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
