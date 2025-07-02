<template>
  <sar-checkbox
    v-model:checked="allChecked"
    :indeterminate="isIndeterminate"
    root-style="margin-bottom: 40rpx"
    @change="onAllChange"
  >
    全选
  </sar-checkbox>

  <sar-checkbox-group v-model="checkedResult">
    <sar-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </sar-checkbox>
  </sar-checkbox-group>
</template>

<script setup lang="ts">
import { useIndeterminate } from 'sard-uniapp'
import { ref } from 'vue'

const checkedResult = ref(['option2'])

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

const { allChecked, isIndeterminate, onAllChange } = useIndeterminate(
  checkedResult,
  options,
)
</script>
