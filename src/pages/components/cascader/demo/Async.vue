<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        :options="options"
        @select="onSelect"
        :fieldKeys="{ children: 'nodeList' }"
        @change="onChange"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'

interface Option {
  label: string
  value: number | string
  nodeList?: Option[]
}

const options = ref<Option[]>(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: 'label' + i,
        value: i,
        nodeList: [],
      }
    }),
)

const onSelect = (option: Option, columnIndex: number) => {
  if (columnIndex < 2 && option.nodeList?.length === 0) {
    setTimeout(() => {
      option.nodeList = Array(10)
        .fill(0)
        .map((_, i) => {
          return {
            label: option.label + '-label' + i,
            value: option.value + '-' + i,
            nodeList: columnIndex < 1 ? [] : undefined,
          }
        })

      options.value = options.value.slice()
    }, 1000)
  }
}

const onChange = (_: any, selectedOptions: Option[]) => {
  toast(selectedOptions.map((option) => option.label).join('/'))
}
</script>
