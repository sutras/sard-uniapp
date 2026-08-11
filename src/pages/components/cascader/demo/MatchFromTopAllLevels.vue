<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        v-model="value"
        :options="options"
        match-from-top
        all-levels
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item title="设置为：[-1]" arrow hover @click="value = [-1]" />
    <sar-list-item
      title="设置为：[1, -1]"
      arrow
      hover
      @click="value = [1, -1]"
    />
    <sar-list-item
      title="设置为：[1, 11, -1]"
      arrow
      hover
      @click="value = [1, 11, -1]"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type CascaderOption } from 'sard-uniapp'

// 每一级都有一个 value 为 -1 的"其他"选项
const options: CascaderOption[] = [
  {
    label: '其他',
    value: -1,
  },
  {
    label: '选项1',
    value: 1,
    children: [
      {
        label: '其他',
        value: -1,
      },
      {
        label: '选项1-1',
        value: 11,
        children: [
          {
            label: '其他',
            value: -1,
          },
          {
            label: '选项1-1-1',
            value: 111,
          },
        ],
      },
    ],
  },
  {
    label: '选项2',
    value: 2,
    children: [
      {
        label: '其他',
        value: -1,
      },
      {
        label: '选项2-1',
        value: 21,
      },
    ],
  },
]

const value = ref<number[] | undefined>([1, 11, 111])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
