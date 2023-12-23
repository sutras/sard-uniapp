<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader :options="options" @update:model-value="onChange" />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

interface Option {
  label: string
  value: string
  disabled: boolean
  children?: Option[]
}

const options: Option[] = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      label: `label${i}`,
      value: `${i}`,
      disabled: i < 3,
      children: Array(10)
        .fill(0)
        .map((_, j) => {
          return {
            label: `label${i}-label${j}`,
            value: `${i}-${j}`,
            disabled: j < 3,
          }
        }),
    }
  })

const onChange = (_: any, selectedOptions: Option[]) => {
  toast(selectedOptions.map((option) => option.label).join('/'))
}
</script>
