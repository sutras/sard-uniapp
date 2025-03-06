<template>
  <sar-form>
    <sar-form-item label="开始时间" star-position="right" name="startTime">
      <sar-datetime-picker-input
        v-model="formData.startTime"
        title="请选择开始时间"
        placeholder="请选择开始时间"
        clearable
        type="yMdh"
        outlet-format="YYYY-MM-DD HH时"
      />
    </sar-form-item>

    <sar-form-item label="结束时间" star-position="right" name="endTime">
      <sar-datetime-picker-input
        v-model="formData.endTime"
        title="请选择结束时间"
        placeholder="请选择结束时间"
        clearable
        type="yMdh"
        outlet-format="YYYY-MM-DD HH时"
        :min="formData.startTime"
      />
    </sar-form-item>
  </sar-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  startTime: undefined,
  endTime: undefined,
})
</script>
