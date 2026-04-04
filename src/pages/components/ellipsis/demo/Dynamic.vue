<template>
  <sar-list card>
    <sar-list-item>
      <sar-segmented v-model="text" :options="contentOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-segmented v-model="rows" :options="rowOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-segmented v-model="position" :options="positionOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-segmented v-model="expanded" :options="expandOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-ellipsis
        :content="text"
        expand-text="展开"
        collapse-text="收起"
        :expanded="expanded"
        :rows="rows"
        :position="position"
        @change="onChange"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { contentEn, contentZh } from './shared'
import { type EllipsisPosition } from 'sard-uniapp'

const contentOptions = [
  { label: 'contentEn', value: contentEn },
  { label: 'contentZh', value: contentZh },
]

const positionOptions = [
  { label: 'start', value: 'start' },
  { label: 'middle', value: 'middle' },
  { label: 'end', value: 'end' },
]

const rowOptions = [
  { label: '1行', value: 1 },
  { label: '2行', value: 2 },
  { label: '3行', value: 3 },
]

const expandOptions = [
  { label: '展开', value: true },
  { label: '收起', value: false },
]

const text = ref(contentEn)
const rows = ref(2)
const position = ref<EllipsisPosition>('start')

const expanded = ref(false)

const onChange = (value: boolean) => {
  expanded.value = value
}
</script>
