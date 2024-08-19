<template>
  <sar-checkbox
    v-model:checked="allChecked"
    :indeterminate="isIndeterminate"
    root-style="margin-bottom: 40rpx"
    @change="onAllChange"
  >
    全选
  </sar-checkbox>

  <sar-checkbox-group v-model="checkedResult" @change="onChange">
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
import { computed, ref } from 'vue'

const checkedResult = ref(['option2'])

const allChecked = ref(false)

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

const isIndeterminate = computed(() => {
  const length = checkedResult.value.length
  return length > 0 && length < options.length
})

const onAllChange = (checked: boolean) => {
  checkedResult.value = checked ? options.map((option) => option.value) : []
}

const onChange = (value: any[]) => {
  allChecked.value = value.length === options.length
}
</script>
